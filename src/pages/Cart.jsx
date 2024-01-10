import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getProductById } from "../hooks/getProductById"
import { cartActions } from "../store/cart-slice"

export default function Cart() {
    const [cartItemsHtml, setCartItemsHtml] = useState()
    const productList = useSelector(state => state.products.productList)
    const cartItemQuantity = useSelector(state => state.cart.totalQuantity)
    const cartItemList = useSelector(state => state.cart.cartItemList)
    const status = useSelector (state => state.products.status)
    const dispatch = useDispatch ()

    const handleInputChange = (event) => {
        setproductQuantity(Number(event.target.value))
    }
    const handleAddQuantityChange = (productToChange) => {
        dispatch(cartActions.addToCart(productToChange))
    }
    const handleRemoveQuantityChange = (productToChange) => {
        dispatch(cartActions.removeFromCart(productToChange))
    }

    useEffect(() => {
        if(status === "success" && cartItemList) {

            //Iterate cartItemList
            //Use getProduct() for more info
            //Use new product to create cartItem

            let productIdList = cartItemList.map(item => ({ ...item }))
            console.log(productIdList);

            let tempCartItemsHtml = []
            for (let productIdPair in productIdList) {
                const productId = productIdList[productIdPair].productId
                const variantId = productIdList[productIdPair].variantId
                const product = getProductById(productList, productId)
                const variant = Object.values(product.variants).find(variant => variant.id === variantId)
                const image = Object.values(product.variantsHaveImages? variant.images : product.images)[0]
                
                // const productToAdd = {productId: productId, variantId: variantId, quantity: 1}

                tempCartItemsHtml.push(
                    <div className="cart__product-container">
                        {product.variantsHaveImages? 
                        <img src={image.link} alt={image.alt} /> :
                        <img src={image.link} alt={image.alt} />
                        }

                        <div className="cart__product-name-wrapper">
                            <h4>{product.name}</h4> {/* CHANGE STYLING */}
                            {variant.name !== "standard" && variant.name}
                            <Link to={""} onClick={() => handleRemoveQuantityChange({productId: productId, variantId: variantId, quantity: "all"})}>Remove</Link>
                        </div>

                        <div id="Quantity-Selector__Input-Wrapper">
                            <button type="button" onClick={() => handleRemoveQuantityChange({productId: productId, variantId: variantId, quantity: -1})}>-</button>
                            <input type="number" name="Quantity" onChange={handleInputChange} value={cartItemList.find(product => product.productId === productId && product.variantId === variantId).quantity}/>
                            <button type="button" onClick={() => handleAddQuantityChange({productId: productId, variantId: variantId, quantity: 1})}>+</button>
                        </div>                        
                    </div>
                )
            }
            setCartItemsHtml(tempCartItemsHtml)
            // for (let productId in productIdArray) {
            //     productCardArray.push(
            //         <div className="grid__item" key={productId}>
            //         </div>
            //     )
            // }
        }
    },[status, cartItemList, cartItemQuantity]) //Might be firing too soon?

    return (
        <div id="Cart-Container">
            {cartItemQuantity?

            <form className="cart"> {/* onsubmit action method nonvalidate */}
                {/* Country alert for purchasing from multiple */}
                <div className="cart__products-container">
                    {cartItemsHtml}
                </div>
                <div className="cart__inputs-container">
                    <div className="cart__special-instruction">
                        <h4>Special Instructions For Seller</h4>
                        <label htmlFor="special-instructions">Special Instructions For Seller</label>
                        <textarea name="special-instructions" id="special-instructions" cols="30" rows="2"></textarea>
                    </div>
                    <div className="cart__checkout-information">
                        <h4 className="cart__total">$XXXXXXXXXX</h4> {/* CHANGE STYLING (Maybe h3/h5?) */}
                        {/* wcp-cart-total */}
                        {/* additional-notes */}
                        {/* cart__taxes */}
                        <button type="submit" name="update" className="btn">Update Cart</button>
                        <button type="submit" name="checkout" className="btn">Checkout</button>
                    </div>
                </div>

            </form>

            : //If cart is empty
            
            <div className="cart-empty"> {/* THIS NEEDS TO TURN INTO A CONDITIONAL */}
                <h1>Shopping Cart</h1>
                <p className="cart-empty__message">Your cart is currently empty</p>
                <hr />
                <p className="cart-empty__continue">
                    <Link to={"/collections/all"} className={"btn"}>Continue browsing</Link> {/* Note "All" */}
                </p>
            </div>
            }
        </div>
    )
}