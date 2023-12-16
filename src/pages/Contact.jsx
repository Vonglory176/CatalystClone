import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Contact() {
    return (
        <div className="contact-page">

            <Header/>

            <main className="main-content">

                <div className="contact-content-container content-container">
                    <div className="contact-content-wrapper content-wrapper">
                        <div className="page-width">
                            <h1 className="h1">Contact</h1>

                            <div className="content-block">
                                <p><strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero tempora dolores doloribus aliquid facere perferendis hic nihil molestias, aut officia.</strong></p>
                                <h4>Lorem ipsum dolor sit amet consectetur.</h4>

                                <p>
                                    Catalyst Game Labs <br/>
                                    7108 S Pheasant Ridge Dr <br/>
                                    Spokane, WA. 99224 <br/>
                                </p>
                            </div>
                            <div className="content-block">
                                <form action="!#" className="contact-form">
                                    <input required type="text" id="ContactFormName" name="contact[name]" placeholder="Name"/>
                                    <input required type="text" id="ContactFormEmail" name="contact[email]" placeholder="Email"/>
                                    <input required type="text" id="ContactFormNumber" name="contact[number]" placeholder="Number"/>

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
                                        <option value="Other">other</option>
                                    </select>
                                    <textarea rows="10" id="ContactFormMessage" name="contact[body]" placeholder="Message"></textarea>
                                    <input type="submit" class="btn" value="Send"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>

        </div>
    )
}