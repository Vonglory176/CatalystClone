import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux"
import { loginWithUserDetails } from "../store/auth-slice.jsx"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export default function Login() {
    const isLoggedIn = useSelector(state=> state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //Routing to Account page if user is logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/account", {replace:true})
        }
    }, [isLoggedIn])

    const handleLoginSubmit = async (e) => {
        e.preventDefault() //Prevents refresh/data-sending
      
        const email = e.target.elements['customer[email]'].value
        const password = e.target.elements['customer[password]'].value
        
        // try {
            // Use Firebase Authentication to sign in
            // const auth = getAuth()

            // Checking for account with matching credentials
            // await signInWithEmailAndPassword(auth, email, password)
            //const response = await signInWithEmailAndPassword(auth, email, password)
            //console.log('Login successful!', response)

            // Getting user-details and setting login status in Redux
            // Auto routes to Account page w/useEffect above
            dispatch(loginWithUserDetails({email, password}))
        // } 
        // catch (error) { 
        //     console.error('Login failed:', error.code, error.message)
        // }
    }

    const [passwordRecovery, setPasswordRecovery] = useState(false)
    const togglePasswordRecovery = () => setPasswordRecovery((r) => !r)


    let loginDiv = (
        <form method="post" action="/account" id="Customer-Login" className="customerForm" onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <input type="email" name="customer[email]" id="CustomerEmail" placeholder="Email"/>
            <input type="password" name="customer[password]" id="CustomerPassword" placeholder="Password"/>
        
            <p><input type="submit" className="btn" value={"Sign In"}/></p>

            <a onClick={togglePasswordRecovery}>Forgot your password?</a>
            <Link to={"/account/register"}>Create account</Link>
        </form>            

        // <div id="CustomerLoginForm" className="loginForm loginForm__loginInfo">
        // </div>
    )
    
    let passwordRecoveryDiv = (
        <form method="post" action="/account/login" id="Customer-Recover" className="customerForm" onSubmit={()=>{return}}>
            <h1>Reset your password</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            <input type="text" name="customer[email]" id="RecoverEmail" placeholder="Email"/>
        
            <p><input type="submit" className="btn" value={"Submit"}/></p>

            <a onClick={togglePasswordRecovery}>Cancel</a>
        </form>

        // <div id="RecoverPasswordForm" className="loginForm loginForm__recoverPassword">
        // </div>
    )

    return (        
        <div id="Login-Container">
            <div className="content-block">
                {/* <div class="form-success " id="ResetSuccess">We've sent you an email with a link to update your password.</div> */}
                {passwordRecovery? passwordRecoveryDiv : loginDiv}

            </div>
        </div>            
    )
}