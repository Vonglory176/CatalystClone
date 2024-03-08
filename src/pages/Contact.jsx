import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react"

export default function Contact() {
    const [reason, setReason] = useState('default')
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
            <form action="/" className="contact-form">
                <div className="contact-form__input-group">
                    <input required type="name" id="ContactFormName" name="contact[name]" placeholder="Name"/>
                    <input required type="email" id="ContactFormEmail" name="contact[email]" placeholder="Email"/>
                </div>

                <input type="text" id="ContactFormNumber" name="contact[number]" placeholder="Store order number"/>

                <label htmlFor="ContactFormReason">Reason for contacting</label>
                <select required id="ContactFormReason" name="contact[reason]" value={reason} onChange={(e) => setReason(e.target.value)}>
                    <option disabled value="default">Select a Reason</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Game Design Submissions">Game Design Submissions</option>
                    <option value="Art Portfolio Submissions">Art Portfolio Submissions</option>
                    <option value="Damaged or Missing Pieces">Damaged or Missing Pieces</option>
                    <option value="Missing PDF">Missing PDF</option>
                    <option value="Store Order Issues">Store Order Issues</option>
                    <option value="Kickstarter Issues">Kickstarter Issues</option>
                    <option value="Canon Character">Canon Character</option>
                    <option value="Other">Other</option>
                </select>
                <textarea rows="10" id="ContactFormMessage" name="contact[body]" placeholder="Message"></textarea>
                <input type="submit" id="ContactFormSubmit" className="btn" value="Send"/>
            </form>
        </div>
    </div>                 
    )
}