import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Collections() {
    return (
        <div className="collections-page page">

            <Header/>

            <main className="main-content">
                <div className="divider"></div>

                <div className="collections-content-container content-container">
                    <div className="collections-content-wrapper content-wrapper">
                        <div className="page-width">
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>

        </div>
    )
}