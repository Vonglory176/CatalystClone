import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Products() {
    return (
        <div className="products-page">

            <Header/>

            <main className="main-content">
                <div className="divider"></div>

                <div className="products-content-container content-container">
                    <div className="products-content-wrapper content-wrapper">
                        <div className="page-width">
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>

        </div>
    )
}