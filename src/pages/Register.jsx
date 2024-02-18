import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginWithUserDetails } from "../store/auth-slice"
import { ref, set, getDatabase } from "firebase/database"
import { useEffect } from 'react'
import { fetchUserCountry } from "../hooks/getUserCountry"
import { createNewAccount } from "../store/auth-slice"

export default function Register() {
    const isLoggedIn = useSelector(state=> state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //Routing to Account page if user is logged in
    useEffect(() => {
        if (isLoggedIn) navigate("/account", {replace:true})
    }, [isLoggedIn])

    const handleCreateAccountSubmit = async (e) => {
        e.preventDefault()
        
        const elements = e.target.elements
        const firstName = elements['register[firstName]'].value
        const lastName = elements['register[lastName]'].value
        const password = elements['register[password]'].value
        const email = elements['register[email]'].value

        dispatch(createNewAccount({email, password, firstName, lastName}))
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