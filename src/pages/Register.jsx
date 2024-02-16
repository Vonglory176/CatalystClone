import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authActions } from "../store/auth-slice"
import { ref, set, getDatabase } from "firebase/database"


export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleCreateAccountSubmit = async (e) => {
        e.preventDefault()

        const firstName = e.target.elements['register[firstName]'].value
        const lastName = e.target.elements['register[lastName]'].value
        const password = e.target.elements['register[password]'].value
        const email = e.target.elements['register[email]'].value

        const auth = getAuth()
        const db = getDatabase()
        
        try {
            console.log(auth.currentUser)
            const response = await createUserWithEmailAndPassword(auth, email, password) //Unsecure?
            
            console.log('Registration successful!', response)
            console.log(auth.currentUser)

            const userID = auth.currentUser.uid
            const reference = ref(db, 'accounts/' + userID)
            
            //Creating entry w/basic information in database
            await set(reference, { //Using the UID for indexing
                firstName: firstName? firstName : null,
                lastName: lastName? lastName: null,
                emailVerified: false,
                addresses: {},
                orders: {},
            }) 

            dispatch(authActions.login()) // Dispatch action as needed
            navigate("/account") // Navigate to the account page
        }
        catch (error) {
            console.error('Registration failed:', error.code, error.message)
        }
    }

    return (
    <div id="Register-Container">
        <h1 className="h1">Create Account</h1>

        <form method="POST" action="/account" id="Customer-Register" className="register-form" onSubmit={handleCreateAccountSubmit}>
            {/* ERROR DIV HERE */}

            <input type="text" id="Register-Form__FirstName" name="register[firstName]" placeholder="First Name"/>
            <input type="text" id="Register-Form__LastName" name="register[lastName]" placeholder="Last Name"/>
            <input required type="email" id="Register-Form__Email" name="register[email]" placeholder="Email"/>
            <input required type="password" id="Register-Form__Password" name="register[password]" placeholder="Password"/>

            <input type="submit" id="Register-Form__Submit" className="btn" value="Send"/>
        </form>
    </div> 
    )
}