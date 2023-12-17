import { Link } from "react-router-dom"

export default function Cart() {
    return (
        <div id="Cart-Container">
            <div className="cart__empty"> {/* THIS NEEDS TO TURN INTO A CONDITIONAL */}
                <h1>Shopping Cart</h1>
                <p className="cart__empty-message">Your cart is currently empty</p>
                <hr />
                <p className="cart__empty-continue">
                    <Link to={"/collections/all"} className={"btn"}>Continue browsing</Link> {/* Note "All" */}
                </p>
            </div>
        </div>
    )
}