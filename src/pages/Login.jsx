import { useState } from "react"
import { useLocation, NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginWithUserDetails } from "../store/auth-slice.jsx"
import { getAuth} from "firebase/auth"
const auth = getAuth()

export default function Login() {
    const dispatch = useDispatch()
    const location = useLocation()
    
    //Login trigger
    const handleAccountLoginSubmit = async (e) => {
        e.preventDefault() //Prevents refresh/data-sending
        
        const email = e.target.elements['customer[email]'].value
        const password = e.target.elements['customer[password]'].value
        
        dispatch(loginWithUserDetails({email, password}))
    }
    console.log(location)

    const [passwordRecovery, setPasswordRecovery] = useState(false)
    const togglePasswordRecovery = () => setPasswordRecovery((r) => !r)


    let loginDiv = (
        <form method="post" action="/account" id="Customer-Login" className="customerForm" onSubmit={handleAccountLoginSubmit}>
            <h1>{location.state?.message || "Login"}</h1>
            <input type="email" name="customer[email]" id="CustomerEmail" placeholder="Email"/>
            <input type="password" name="customer[password]" id="CustomerPassword" placeholder="Password"/>
        
            <p><input type="submit" className="btn" value={"Sign In"}/></p>

            <a onClick={togglePasswordRecovery}>Forgot your password?</a>
            <NavLink to={"/account/register"} title="Create an account" state={{...location.state}} replace>Create account</NavLink>
            {/* <Link to={"/account/register"}>Create account</Link> */}
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

//Routing to Account page if user is logged in
    // useEffect(() => {
    //     if (isLoggedIn) {
    //         navigate("/account", {replace:true})
    //     }
    // }, [isLoggedIn])