import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ref, get, getDatabase } from "firebase/database"
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth"

export const loginWithUserDetails = createAsyncThunk(
    'auth/loginWithUserDetails',
    async ( {email, password}, thunkAPI ) => {
        const auth = getAuth()

        try {
            if (!email || !password) throw new Error("Both an Email and Password are required")

            //Authenticating login details
            await signInWithEmailAndPassword(auth, email, password)
            console.log('Account found in Database')

            //Getting Account details from Firebase to use locally
            const userRef = ref(getDatabase(), `accounts/${auth.currentUser.uid}`)
            const snapshot = await get(userRef) 
    
            if (snapshot.exists()) return snapshot.val()  
            else throw new Error("No matching User found")
        }
        catch (error) {
            console.error('Login failed:', error.message) //error.code
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const createNewUserAddress = createAsyncThunk(
    'auth/createNewUserAddress',
    async ( address, thunkAPI) => {
        const auth = getAuth()
        console.log(auth.currentUser.uid)

        try {
            //Getting updated address list
            const addressRef = ref(getDatabase(), `accounts/${auth.currentUser.uid}/addresses`)
            const snapshot = await get(addressRef) //Getting Account details from Firebase
    
            console.log(snapshot)
    
            if (snapshot.exists()) return snapshot.val()  
            else throw new Error("No products avalible")
        }
        catch (error) {
            console.error('Login failed:', error.message) //error.code
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
                const auth = getAuth()
                signOut(auth)                
            }
            catch (error) {
                console.error(error)
            }
        },
    },
    extraReducers: (builder) => { //For post action changes
        builder        
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
            // console.error(state.error)
        })
        //Login Pending
        // .addCase(loginWithUserDetails.pending, (state, action) => {
        //     state.status = 'loading'
        // })
        //New Address Success
        .addCase(createNewUserAddress.fulfilled, (state, action) => {
            console.log(action.payload)
            // state.user.address = action.payload

            state.status = 'Address creation successful'
            console.log(state.status)
            // console.log(state.user)
        })
        //New Address Failure
        .addCase(createNewUserAddress.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'Address creation failed'
            // console.error(state.error)
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