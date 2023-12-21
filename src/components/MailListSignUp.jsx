export default function MailListSignUp() {
    return (
        <div className="mailListSignUp">
            <form action="" target="_blank">
                <label htmlFor="mailListSignUp-email">Subscribe to our mailing list for exclusive access to new releases and sales</label>
                <input type="email" id="mailListSignUp-email" name="email" autoComplete="email" className="email" placeholder="Email Address" required/>
                <input type="submit" value="Subscribe" name="subscribe" className="btn"/> {/* className={"button"} */}
            </form>
        </div>
    )
}