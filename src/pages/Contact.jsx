import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Contact() {
    return (
    <div id="Contact-Container">
        <h1 className="h1">Contact</h1>

        <div className="content-block">
            <p><strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero tempora dolores doloribus aliquid facere perferendis hic nihil molestias, aut officia.</strong></p>
            <h4>MAILING ADDRESS (LETTERS AND USPS PACKAGES ONLY)</h4>

            <p>
                Lorem, ipsum dolor. <br/>
                Lorem ipsum dolor sit. <br/>
                Lorem, ipsum dolor. <br/>
            </p>
        </div>
        <div className="content-block">
            <form action="!#" className="contact-form">
                <div className="contact-form__input-group">
                    <input required type="text" id="ContactFormName" name="contact[name]" placeholder="Name"/>
                    <input required type="text" id="ContactFormEmail" name="contact[email]" placeholder="Email"/>
                </div>

                <input required type="text" id="ContactFormNumber" name="contact[number]" placeholder="Store order number"/>

                <label htmlFor="ContactFormReason">Reason for contacting</label>
                <select required id="ContactFormReason" name="contact[reason]" onchange="">
                    <option disabled selected value>Select a Reason</option>
                    <option>General Inquiry</option>
                    <option>Game Design Submissions</option>
                    <option>Art Portfolio Submissions</option>
                    <option>Damaged or Missing Pieces</option>
                    <option>Missing PDF</option>
                    <option>Store Order Issues</option>
                    <option>Kickstarter Issues</option>
                    <option>Canon Character</option>
                    <option value="Other">Other</option>
                </select>
                <textarea rows="10" id="ContactFormMessage" name="contact[body]" placeholder="Message"></textarea>
                <input type="submit" id="ContactFormSubmit" className="btn" value="Send"/>
            </form>
        </div>
    </div>                 
    )
}