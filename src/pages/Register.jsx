export default function Register() {
    return (
    <div id="Register-Container">
        <h1 className="h1">Create Account</h1>

        <form action="!#" className="register-form">
            {/* ERROR DIV HERE */}

            <input required type="text" id="Register-Form__FirstName" name="contact[first_name]" placeholder="First Name"/>
            <input required type="text" id="Register-Form__LastName" name="contact[last_name]" placeholder="Last Name"/>
            <input required type="text" id="Register-Form__Email" name="contact[email]" placeholder="Email"/>
            <input required type="text" id="Register-Form__Password" name="contact[password]" placeholder="Password"/>

            <input type="submit" id="Register-Form__Submit" className="btn" value="Send"/>
        </form>
    </div> 
    )
}