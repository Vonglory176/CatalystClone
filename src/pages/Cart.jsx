import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getProductById } from "../hooks/getProductById"
import { cartActions } from "../store/cart-slice"

import placeholderImage from "../assets/placeholder.png"
import ProgressiveImage from "react-progressive-image"

export default function Cart() {
    const [cartItemsHtml, setCartItemsHtml] = useState()
    const productList = useSelector(state => state.products.productList)
    const cartItemList = useSelector(state => state.cart.cartItemList)
    const status = useSelector (state => state.products.status)
    const dispatch = useDispatch ()

    const [totalPrice, setTotalPrice] = useState(0)

    const handleInputChange = (event) => {
        // setproductQuantity(Number(event.target.value))
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
            let tempTotalPrice = 0

            for (let productIdPair in productIdList) {
                const productId = productIdList[productIdPair].productId
                const variantId = productIdList[productIdPair].variantId

                const product = getProductById(productList, productId)
                const variant = Object.values(product.variants).find(variant => variant.id === variantId)

                const productUniverse = product.universe === 'Other'? "" : product.universe
                
                const quantity = cartItemList.find(product => product.productId === productId && product.variantId === variantId).quantity
                const price = (product.isOnSale? variant.discountedPrice : variant.price)
                const quantityPrice = Number((quantity * price).toFixed(2))

                const productLink = `/products/${productId}${variantId !== "standard"? `?variant=${variantId}` : ""}`
                const image = Object.values(product.variantsHaveImages? variant.images : product.images)[0].link

                tempTotalPrice += quantityPrice
                // Number((tempTotalPrice += quantityPrice).toFixed) //Adding to total price

                // const productToAdd = {productId: productId, variantId: variantId, quantity: 1}
                // setTotalPrice(prevTotalPrice => {return Number((prevTotalPrice + quantityPrice).toFixed(2))})
                
                tempCartItemsHtml.push(
                    <div className="cart-product">
                        <div className="cart-product__image-wrapper">
                            <Link to={productLink}>
                                <ProgressiveImage src={image} placeholder={placeholderImage}>
                                    {(src, loading) =>
                                    <img 
                                    src={src} 
                                    // alt={imageAlt}
                                    className={loading? "imgLoading":"imgLoaded"}
                                    />
                                }                            
                                </ProgressiveImage>
                            </Link>
                        </div>

                        <div className="cart-product__name-wrapper">
                            <Link to={productLink}><h4>{productUniverse}: {product.name}</h4></Link>
                            {variant.name !== "standard" && <p>{variant.name}</p>}
                            <Link to={""} onClick={() => handleRemoveQuantityChange({productId: productId, variantId: variantId, quantity: "all"})}>Remove</Link>
                        </div>
                        
                        <div className="quantity-selector">
                            <label htmlFor="Quantity">Quantity</label>
                            <div className="quantity-selector__wrapper">
                                <button type="button" onClick={() => handleRemoveQuantityChange({productId: productId, variantId: variantId, quantity: -1})}>-</button>
                                <input type="number" name="Quantity" onChange={handleInputChange} value={quantity}/>
                                <button type="button" onClick={() => handleAddQuantityChange({productId: productId, variantId: variantId, quantity: 1})}>+</button>
                            </div>
                        </div>

                        <div className="cart-product__price">${quantityPrice}</div>
                    </div>
                )
            }
            setCartItemsHtml(tempCartItemsHtml)
            setTotalPrice((tempTotalPrice).toFixed(2))
        }
    },[status, cartItemList]) //Might be firing too soon?

    return (
        <div id="Cart-Container">
            {cartItemList.length !== 0?

            <form className="cart"> {/* onsubmit action method nonvalidate */}
                {/* Country alert for purchasing from multiple */}
                <div className="cart-products-container">
                    {cartItemsHtml}
                </div>
                <div className="cart-inputs">
                    <div className="cart-inputs__special-instruction">
                        {/* <h4>Special Instructions For Seller</h4> */}
                        <label htmlFor="special-instructions">Special Instructions For Seller</label>
                        <textarea name="special-instructions" id="special-instructions" cols="30" rows="2"></textarea>
                    </div>
                    <div className="cart-checkout">
                        <h4 className="cart-checkout__total-price">${totalPrice}</h4> {/* CHANGE STYLING (Maybe h3/h5?) */}
                        <p className="cart-checkout__tax-disclaimer">Taxes and shipping calculated at checkout</p>
                        {/* wcp-cart-total */}
                        {/* additional-notes */}
                        {/* cart__taxes */}
                        <button type="submit" name="update" className="btn">Update Cart</button>
                        <button type="submit" name="checkout" className="btn">Check Out</button>
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