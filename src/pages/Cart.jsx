import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Cart() {
    return (
        <div className="cart-page">

            <Header/>

            <main className="main-content">
                <div className="divider"></div>

                <div className="cart-content-container content-container">
                    <div className="cart-content-wrapper content-wrapper">
                        <div className="page-width">
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>

        </div>
    )
}