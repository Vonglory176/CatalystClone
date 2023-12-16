import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Account() {
    return (
        <div className="account-page">

            <Header/>

            <main className="main-content">
                <div className="divider"></div>

                <div className="account-content-container content-container">
                    <div className="account-content-wrapper content-wrapper">
                        <div className="page-width">
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>

        </div>
    )
}