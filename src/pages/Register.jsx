import { useDispatch, useSelector } from "react-redux"
import { useState, createRef } from 'react'
import { createNewAccount } from "../store/auth-slice"
import ReCAPTCHA from "react-google-recaptcha"

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
            <input required type="email" id="Register-Form__Email" name="register[email]" placeholder="Email"/>
            <input required type="password" id="Register-Form__Password" name="register[password]" placeholder="Password"/>
            <ReCAPTCHA ref={recaptchaRef} sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} />


            <input type="submit" id="Register-Form__Submit" className="btn" value="Send"/>
        </form>
    </div> 
    )
}