import Header from "../components/Header"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

export default function Cart() {
    return (
        <div className="cart-page page">

            <Header/>

            <main className="main-content">

                <div className="cart-content-container content-container">
                    <div className="cart-content-wrapper content-wrapper">
                        <div className="page-width">
                            <div className="cart__empty"> {/* THIS NEEDS TO TURN INTO A CONDITIONAL */}
                                <h1>Shopping Cart</h1>
                                <p className="cart__empty-message">Your cart is currently empty</p>
                                <hr />
                                <p className="cart__empty-continue">
                                    <Link to={"/collections/all"} className={"btn"}>Continue browsing</Link> {/* Note "All" */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>

        </div>
    )
}