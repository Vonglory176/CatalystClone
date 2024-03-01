import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ref, get, set, update, remove, getDatabase } from "firebase/database"
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { showAndHideNotification } from './ui-slice' //uiActions
import { fetchUserCountry } from "../hooks/getUserCountry"
import fetchCaptchaVerification from '../fetch/fetchCaptchaVerification'

import firebaseApp from '/functions/firebaseConfig'
const auth = getAuth()

// ACCOUNT RETRIEVAL
export const fetchUserDetails = createAsyncThunk(
    'auth/fetchUserDetails',
    async ( _, thunkAPI ) => {
        console.log("Fetching Account Details")
        try {
            //Get current state and check login status (w/Local UID)
            const state = thunkAPI.getState()
            console.log(state)
            if (!state.auth.isLoggedIn || !state.auth.user.userId ) return null
            
            // let userID
            // try {
            //     userID = auth.currentUser.uid
            //     console.log(userID)
            // } catch (error) {}

            //Getting Account details from Firebase to use locally
            const userRef = ref(getDatabase(), `accounts/${state.auth.user.userId}`)
            const snapshot = await get(userRef)

            if (snapshot.exists()) return snapshot.val()
            else throw new Error("No matching User found")
        }
        catch (error) {
            console.error('Account retrieval failed:', error.code, error.message) 
            thunkAPI.dispatch(authActions.logout()) //Automatically logging out the user
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

// ACCOUNT LOGIN
export const loginWithUserDetails = createAsyncThunk(
    'auth/loginWithUserDetails',
    async ( {email, password, token}, thunkAPI ) => {
        try {
        //Validating ReCAPTCHA
        console.log(token)
            const responseCode  = await fetchCaptchaVerification(token)
            if (responseCode !== 0) throw new Error("Failed CAPTCHA verification")

        // Validating Email / Password
            if (!email || !password) throw new Error("Both an Email and Password are required")
            
            //Authenticating login details
            await signInWithEmailAndPassword(auth, email, password)
            console.log('Account found in Database')

            //Getting Account details from Firebase to use locally
            const userID = auth.currentUser.uid
            const userRef = ref(getDatabase(), `accounts/${userID}`)
            const snapshot = await get(userRef) 
            
            if (snapshot.exists()) return snapshot.val()  
            else throw new Error("No matching User found")
        }
        catch (error) {
            console.error('Login failed:', error.message) //error.code

            // Create an outcome notification
            thunkAPI.dispatch(showAndHideNotification({
                message: 'Incorrect email or password.',
                type: 'error'
            }))

            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

// ACCOUNT CREATION
export const createNewAccount = createAsyncThunk(
    'auth/createNewAccount',
    async ( {email, password, firstName, lastName, token}, thunkAPI ) => {
        
        try {
        //Validating ReCAPTCHA
            const responseCode  = await fetchCaptchaVerification(token)
            if (responseCode !== 0) throw new Error("Failed CAPTCHA verification")

        // Validating Email / Password
            if (!email || !password) throw new Error("Both an Email and Password are required")
            
            //Creating account in Firebase-Auth
            const response = await createUserWithEmailAndPassword(auth, email, password) //Unsecure?
            console.log('Account created in Database', response)
            
            //Getting location from IPAPI (US as default if failure)
            let userCountry = "United States"
            try {userCountry = await fetchUserCountry()} 
            catch (error) {console.log("Failure to communicate with 'ipapi.co' API")}
            
            //Setting account details in Firebase Realtime DB
            const userID = auth.currentUser.uid
            const userRef = ref(getDatabase(), `accounts/${userID}`)
            await set(userRef, { //Using the UID for indexing
                userId: userID,
                emailVerified: false,
                addresses: [
                    {
                        isDefaultAddress: true,
                        firstName: firstName? firstName : "",
                        lastName: lastName? lastName: "",
                        company: "",
                        address1: "",
                        address2: "",
                        city: "",
                        country: userCountry,
                        province: "",
                        postalCode: "",
                        phone: "",
                    }
                ],
                orders: false,
            })
            //Automatically logging into the new Account after creation
            thunkAPI.dispatch(loginWithUserDetails({email, password}))
        }
        catch (error) {
            console.error('Registration failed:', error.code, error.message) //error.code

            // Create an outcome notification
            thunkAPI.dispatch(showAndHideNotification({
                message: 'This email address is already associated with an account.',
                type: 'error'
            }))

            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

// ADDRESS CREATION
export const createNewUserAddress = createAsyncThunk(
    'auth/createNewUserAddress',
    async ( newAddress, thunkAPI ) => {
        const userID = auth.currentUser.uid

        try {
            //Getting updated address list
            const userRef = ref(getDatabase(), `accounts/${userID}`)
            const snapshot = await get(userRef) //Getting Account details from Firebase
            
            //Verifying that the list exists before appending the new address
            if (snapshot.exists()) {
                const response = snapshot.val()
                let addressList = response.addresses
                console.log(addressList, response)

                if (addressList) {
                    //Throwing an error if the new address already exists
                    const isAddressEqual = (address1, address2) => {
                        return Object.keys(address1).every(key => address1[key] === address2[key])
                    }                
                    if (addressList.find(address => isAddressEqual(address, newAddress))) {
                        throw new Error("Address already exists")
                    }
                    // If new Address is default, set all other addresses to false
                    if (newAddress.isDefaultAddress) {
                        addressList = addressList.map(address => ({
                            ...address,
                            isDefaultAddress: false
                        }))
                    }
                    addressList.push(newAddress)
                }
                else { //If first/only entry, auto set to default
                    addressList = [{...newAddress, isDefaultAddress: true}]
                }
                

                //Updating address list for user in Firebase
                const addressRef = ref(getDatabase(), `accounts/${userID}/addresses`)
                await set(addressRef, addressList)

                //Updating address list for user in Redux
                return addressList
            }
            else throw new Error("Could not find user Address list")
        }
        catch (error) {
            console.error('Address creation failed:', error.message)
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

// ADDRESS UPDATE
export const updateUserAddress = createAsyncThunk(
    'auth/updateUserAddress',
    async ( {updatedAddress, prevAddress}, thunkAPI ) => {
        const userID = auth.currentUser.uid
        console.log(updatedAddress)
        console.log(prevAddress)

        try {
            //Getting updated address list
            const userRef = ref(getDatabase(), `accounts/${userID}`)
            const snapshot = await get(userRef) //Getting Account details from Firebase
            
            //Verifying that the list exists before appending the new address
            if (snapshot.exists()) {
                const response = snapshot.val()                
                const addressList = response.addresses ? response.addresses : []
                console.log(addressList)

                //Checking if the new address already exists
                const isAddressEqual = (address1, address2) => {
                    return Object.keys(address1).every(key => address1[key] === address2[key])
                }
                const addressIndex = addressList.findIndex(address => isAddressEqual(address, prevAddress))
                console.log(addressIndex)

                //THROWS ERROR IF NO MATCH FOUND (Nothing to edit)
                if (addressIndex === -1) throw new Error("Address to edit could not be found")

                //Updating address list for user in Redux
                addressList[addressIndex] = updatedAddress

                //Updating address list in Firebase
                const addressesRef = ref(getDatabase(), `accounts/${userID}/addresses`)
                await set(addressesRef, addressList)
                // await remove(addressRef)

                return addressList
            }
            else throw new Error("Could not find the User in the Database")
        }
        catch (error) {
            console.error('Address update failed:', error.message)
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

// ADDRESS REMOVAL
export const removeUserAddress = createAsyncThunk(
    'auth/removeUserAddress',
    async ( removalAddress, thunkAPI ) => {
        const userID = auth.currentUser.uid

        try {
            //Getting updated address list
            const userRef = ref(getDatabase(), `accounts/${userID}`)
            const snapshot = await get(userRef) //Getting Account details from Firebase
            
            //Verifying that the list exists before appending the new address
            if (snapshot.exists()) {
                const response = snapshot.val()
                let addressList = response.addresses ? response.addresses : []

                //Checking if the new address already exists
                const isAddressEqual = (address1, address2) => {
                    return Object.keys(address1).every(key => address1[key] === address2[key])
                }
                const addressIndex = addressList.findIndex(address => isAddressEqual(address, removalAddress))
                console.log(addressIndex)

                //Updating address list for user in Redux
                addressList.splice(addressIndex, 1)

                //Removing address from list in Firebase
                const addressesRef = ref(getDatabase(), `accounts/${userID}/addresses`)
                await set(addressesRef, addressList)
                // await remove(addressRef)

                return addressList
            }
            else throw new Error("Could not find the User in the Database")
        }
        catch (error) {
            console.error('Address removal failed:', error.message)
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        user: null,
        status:"idle"
    }, 
    reducers: {
        logout(state) {
            try {
                // Resetting Redux State
                state.isLoggedIn = false
                state.user = null

                // Logging out w/Firebase-Auth
                signOut(auth)
                
                console.log("Logout successful")
            }
            catch (error) {
                console.error("Logout failure: " + error)
            }
        },
    },
    extraReducers: (builder) => { //For post action changes
        builder       

    //// ACCOUNT RETRIEVAL //////////////////////////////////////////////////////////////////////////////
    
        //Retrieval Success
        .addCase(fetchUserDetails.fulfilled, (state, action) => {
            if (action.payload !== null) { //To prevent repeat on logout
                state.user = action.payload
                state.status = 'Account fetch successful'
                console.log(state.status)
                console.log(state.user)
            }
        })
        //Retrieval Failure
        .addCase(fetchUserDetails.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'Account fetch failed'
            console.error(state.error)
        })

    //// ACCOUNT LOGIN //////////////////////////////////////////////////////////////////////////////
    
        //Login Success
        .addCase(loginWithUserDetails.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true

            state.status = 'Login successful'
            console.log(state.status)
            // console.log(state.user)
        })
        //Login Failure
        .addCase(loginWithUserDetails.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'Login failed'
            console.error(state.error)
        })

    //// ACCOUNT REGISTER //////////////////////////////////////////////////////////////////////////////
    
        //Registration Success
        .addCase(createNewAccount.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true

            state.status = 'Registration successful'
            console.log(state.status)
            // console.log(state.user)
        })
        //Registration Failure
        .addCase(createNewAccount.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'Registration failed'
            console.error(state.error)
        })

    //// ADDRESS CREATION //////////////////////////////////////////////////////////////////////////////
        
        //Address Creation Success
        .addCase(createNewUserAddress.fulfilled, (state, action) => {
            console.log(action.payload)
            state.user.addresses = action.payload

            state.status = 'Address creation successful'
            console.log(state.status)
        })
        //Address Creation Failure
        .addCase(createNewUserAddress.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'Address creation failed'
            console.error(state.error)
        })

    //// ADDRESS UPDATE //////////////////////////////////////////////////////////////////////////////
        
        //Address Update Success
        .addCase(updateUserAddress.fulfilled, (state, action) => {
            state.user.addresses = action.payload

            state.status = 'Address update successful'
            console.log(state.status)
        })
        //Address Update Failure
        .addCase(updateUserAddress.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'Address update failed'
            console.error(state.error)
        })

    //// ADDRESS REMOVAL //////////////////////////////////////////////////////////////////////////////
        
        //Address Removal Success
        .addCase(removeUserAddress.fulfilled, (state, action) => {
            state.user.addresses = action.payload

            state.status = 'Address removal successful'
            console.log(state.status)
        })
        //Address Removal Failure
        .addCase(removeUserAddress.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'Address removal failed'
            console.error(state.error)
        })
    },
})

export const authActions = authSlice.actions //For reducer use

export default authSlice //For store-index import

//useSelector is for getting info
//useDispatch is for doing something

// login(state) {
//     try {
//         // Getting Firebase copy of user details to save in Redux
//         const userData = loginWithUserDetails()
//         state.user = userData

//         // Setting login status in Redux
//         state.isLoggedIn = true
//     }
//     catch (error) {
//         console.error(error)
//     }
// }