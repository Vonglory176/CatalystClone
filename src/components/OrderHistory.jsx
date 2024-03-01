import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAuth } from "firebase/auth"
import fetchOrderHistory from "../fetch/fetchOrderHistroy"
import translatePrice from "../hooks/translatePrice"
import { displayDate } from "../hooks/getDateTime"

export default function OrderHistory({doneLoadingCallback}) {
  const [orderHistory, setOrderHistory] = useState()
  const user = useSelector(state => state.auth.user) //Use Firebase-Auth instead?
  const auth = getAuth()

  useEffect(() => {
      const getOrders = async () => {
          const authToken = await auth.currentUser.getIdToken()
          console.log('Token:', authToken)

          setOrderHistory(await fetchOrderHistory())
          doneLoadingCallback(true)
        }
        if (user && auth.currentUser) getOrders()
      }, [auth.currentUser])

  const printOrderRows = () => {
    if (orderHistory) {
      const reversedOrderHistory = orderHistory.slice().reverse() //So orders display from new to old
      return reversedOrderHistory.map(item => {
          return (
            <tr key={item.id}>
              <td data-label="Order"><Link to={`order?session_id=${item.metadata.sessionId}`} title={`View the details of ${item.metadata.orderId}`}>{item.metadata.orderId}</Link></td>
              <td data-label="Date">{displayDate(item.created)}</td>
              <td data-label="Payment Status">{item.payment_status}</td>
              <td data-label="Fulfillment Status">{item.status}</td>
              <td data-label="Total">{translatePrice(item.amount_total)}</td>
            </tr>
          )
      })
    }
  }

  return (
    <div className="order-history">
        <h2>Order History</h2>
        {orderHistory?
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Payment</th> {/* Payment Status */}
                <th>Status</th> {/* Fulfillment Status */}
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {printOrderRows()}              
            </tbody>
          </table>

          :

          (orderHistory === null? 
            <p>You haven't placed any orders yet</p> : 
            <p>Loading your order...</p>
          )   
        }
    </div>
  )
}