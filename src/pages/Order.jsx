import {useEffect, useState} from 'react'
import {Link, useSearchParams, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getAuth } from "firebase/auth"
import fetchOrderDetails from '../fetch/fetchOrderDetails'
import translatePrice from '../hooks/translatePrice'
import getProductLinkWithNameAndVariant from '../hooks/getProductLinkByNameAndVariant'
import { displayDateTime } from '../hooks/getDateTime'
import LoadingScreen from "/src/components/LoadingScreen"
import { cartActions } from "../store/cart-slice"

//http://localhost:8888/cart/success?session_id=3da29ea2-e60a-4a5c-9f88-719914152ff7

export default function OrderDetails() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [orderDetails, setOrderDetails] = useState()
    
    const user = useSelector(state => state.auth.user) //Use Firebase-Auth instead?
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const products = useSelector(state => state.products.productList)
    const dispatch = useDispatch()
    const location = useLocation()
    const auth = getAuth()

    // SESSION SEARCH
    useEffect(() => {
        const getDetails = async () => {
            // Get the sessionId parameter from the URL
            const sessionId = searchParams.get('session_id')

            // Fetch matching order details
            if (sessionId) setOrderDetails(await fetchOrderDetails(sessionId))
            else console.error('No session ID found in URL')
        }
        if (user && auth.currentUser) getDetails()
    }, [searchParams, auth.currentUser])

    // CART CLEARING
    useEffect(() => {
        //If order was completed within the last 10 seconds, clear the users cart
        if (orderDetails) {
            const orderTimeStamp = orderDetails.metadata.completionTime
            const currentTimeStamp = Math.floor(Date.now() / 1000)

            if (Math.abs(orderTimeStamp - currentTimeStamp) <= 10) {
                dispatch(cartActions.clearCartItems())
                
                // dispatch(cartActions.removeFromCart({
                //     productId: productId, variantId: variantId, quantity: "all"
                // }))
            }
        }
    }, [orderDetails])

    const printProductRows = () => {
        if (orderDetails.lineItems) {
            return orderDetails.lineItems.map(item => {
                return (
                    <tr className="responsive-table__row" key={item.id}>
                        <td data-label="Product">
                            <div className="order-details__product-name">
                                <Link to={`/products/${getProductLinkWithNameAndVariant(products, item.description)}`} title={`View product details`}>{item.description}</Link>
                            </div>
                        
                            {/* <div className="note">Fulfilled February 22, 2024<div><div></div></div></div> */}
                        
                        </td>
                        {/* <td data-label="SKU">{item.id}</td> */}
                        <td data-label="Price">{translatePrice(item.amount_subtotal)}</td>
                        <td data-label="Quantity">{item.quantity}</td>
                        <td data-label="Total" >{translatePrice(item.amount_total)}</td>
                    </tr>
                )
            })
        }
    }

    return (
        <div id='Order-Details-Container'>
            {orderDetails? 
                <div className='order-details'>
                    <h1>{location.pathname === "/cart/success"? "Thank you for your purchase!" : "My Account"}</h1>

                    <div className='order-details__wrapper'>

                        <div className="order-details__main-container">
                            {/* 'IF DOWNLOADABLE FILES' CODE HERE */}
                            {orderDetails.metadata.digitalItems && <Link to={"/account/downloads"} className={"button-link btn"} title="View your downloadable files">My Downloadable Files</Link>} {/* Note "All" */}

                            <h2 className="order-details__number">{orderDetails.metadata.orderId}</h2>
                            <p className='order-details__time'>{displayDateTime(orderDetails.created)}</p>

                            <table className="order-details__table">
                                <thead>
                                    <tr>
                                    <th>Product</th>
                                    {/* <th>SKU</th> */}
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {printProductRows()}
                                </tbody>

                                <tfoot>
                                    <tr className="responsive-table__row">
                                    <td colSpan="3" className="small--hide">Subtotal</td>
                                    <td data-label="Subtotal">{translatePrice(orderDetails.amount_subtotal)}</td>
                                    </tr>

                                    <tr>
                                    <td colSpan="3" className="small--hide"><strong>Total</strong></td>
                                    <td data-label="Total"><strong>{translatePrice(orderDetails.amount_total)} USD</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                            {orderDetails.metadata.customerInstructions && <p className='order-details__special-instructions'><strong>Special Instructions: </strong>{orderDetails.metadata.customerInstructions}</p>}
                        </div>

                        <div className="order-details__address-container">
                            {/* BILLING */}
                            <h2>Billing Address</h2>
                            <p><strong>Payment Status:</strong> {orderDetails.payment_status}</p>

                            <p>
                                {orderDetails.customer_details.name} {orderDetails.customer_details.name && <br/>}
                                {/* {orderDetails.customer_details.address.company} <br/> */}
                                {orderDetails.customer_details.address.line1} {orderDetails.customer_details.address.line1 && <br/>} 
                                {/* {orderDetails.customer_details.address.line2} <br/> */}
                                {orderDetails.customer_details.address.city} {orderDetails.customer_details.address.state} {orderDetails.customer_details.address.postal_code} <br/>
                                {orderDetails.customer_details.address.country} {orderDetails.customer_details.address.country && <br/>}
                            </p>

                            {/* SHIPPING */}
                            <h2>Shipping Address</h2>
                            <p><strong>Fufillment Status:</strong> {orderDetails.status}</p>

                            {orderDetails.shipping_details && //If shipping details exist
                                <p>
                                    {orderDetails.shipping_details.name} <br/>
                                    {/* {orderDetails.shipping_details.address.company} <br/> */}
                                    {orderDetails.shipping_details.address.line1} <br/>
                                    {/* {orderDetails.shipping_details.address.line2} <br/> */}
                                    {orderDetails.shipping_details.address.city} {orderDetails.shipping_details.address.state} {orderDetails.shipping_details.address.postal_code} <br/>
                                    {orderDetails.shipping_details.address.country} <br/><br/>
                                </p>
                            }

                        </div>
                    </div>
                </div>
                :
                (orderDetails === null? 
                    <div className="order-notFound"> {/* THIS NEEDS TO TURN INTO A CONDITIONAL */}
                        <h1>Order not found</h1>
                        <p className="cart-notFound__message">The order you are looking for could not be found. Please check the URL and try again.</p>
                        <hr />
                        <p className="cart-notFound__continue">
                            {isLoggedIn? 
                                <Link to={"/account"} className={"btn"} title="View your Account">View Account</Link>
                                :
                                <Link to={"/"} className={"btn"} title="Return home">Return home</Link>
                            }
                        </p>
                    </div>
                    // <p><strong>Error 404:</strong> Order could not be found</p> 
                    :                     
                    <LoadingScreen/> // <p>Loading your order...</p>
                )
            }
        </div>
    )
}

// const fetchOrderDetails = async () => {
        //     console.log("Getting order details")
        //     const authToken = await auth.currentUser.getIdToken()
        //     console.log('Token:', authToken)
            
        //     // Get the sessionId parameter from the URL
        //     const sessionId = searchParams.get('session_id')
        //     console.log(sessionId)
        //     if (sessionId) {
        //         try {
        //             //Firing serverless function to get the order details
        //             const response = await fetch(`/.netlify/functions/getOrderDetails?session_id=${sessionId}`, { //&userId=${user.uid}
        //                 method: 'GET',
        //                 headers: {
        //                     'Authorization': `Bearer ${authToken}`,
        //                     'Content-Type': 'application/json'
        //                 }
        //             })

        //             console.log(response)
                    
        //             // If details found, save and display
        //             if (response.ok) {
        //                 const data = await response.json()
        //                 console.log(data)
        //                 setOrderDetails(data)
        //             }
        //             else throw new Error('Order not found')
                    
        //         } catch (error) {
        //             console.error("Error fetching order:", error)
        //         }
        //     }
        // }
        // if (user && auth.currentUser) fetchOrderDetails()