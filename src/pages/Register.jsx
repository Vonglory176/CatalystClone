import { useDispatch, useSelector } from "react-redux"
import { useState, createRef } from 'react'
import { createNewAccount } from "../store/auth-slice"
import ReCAPTCHA from "react-google-recaptcha"
import { NavLink } from "react-router-dom"

export default function Register() {
    const dispatch = useDispatch()
    const recaptchaRef = createRef()

    
    const handleCreateAccountSubmit = async (e) => {
        e.preventDefault()
        
        const elements = e.target.elements
        const firstName = elements['register[firstName]'].value
        const lastName = elements['register[lastName]'].value
        const password = elements['register[password]'].value
        const email = elements['register[email]'].value
        const token = recaptchaRef.current.getValue()

        dispatch(createNewAccount({email, password, firstName, lastName, token}))
    }

    return (
    <div id="Register-Container">
        <h1 className="h1">Create Account</h1>

        <form method="POST" action="/account" id="Customer-Register" className="register-form" onSubmit={handleCreateAccountSubmit}>
            {/* ERROR DIV HERE */}

            <input type="text" id="Register-Form__FirstName" name="register[firstName]" placeholder="First Name"/>
            <input type="text" id="Register-Form__LastName" name="register[lastName]" placeholder="Last Name"/>
            <input type="email" id="Register-Form__Email" name="register[email]" placeholder="Email"/>
            <input type="password" id="Register-Form__Password" name="register[password]" placeholder="Password"/>
            
            <input type="submit" id="Register-Form__Submit" className="btn" value="Send"/>
            <ReCAPTCHA ref={recaptchaRef} className="recaptcha" sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} />

            <NavLink to={"/account/login"} title="Return to login page" state={{...location.state}} replace>Back to login</NavLink>
        </form>
    </div>
    )
}