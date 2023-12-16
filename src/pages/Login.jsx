import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Login() {
    return (
        <div className="login-page">

            <Header/>

            <main className="main-content">
                <div className="divider"></div>

                <div className="login-content-container content-container">
                    <div className="login-content-wrapper content-wrapper">
                        <div className="page-width">
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>

        </div>
    )
}