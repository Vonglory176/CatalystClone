import { getAuth } from "firebase/auth"
const auth = getAuth()

export default async function fetchOrderDetails(sessionId) {
    console.log("Getting order details")
    const authToken = await auth.currentUser.getIdToken()
    console.log('Token:', authToken)

    try {
        //Firing serverless function to get the order details
        const response = await fetch(`/.netlify/functions/getOrderDetails?session_id=${sessionId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        })

        console.log(response)
        
        // If details found, save and display
        if (response.ok) {
            const data = await response.json()
            console.log(data)

            return data
        }
        else throw new Error('Order not found')
        
    } catch (error) {
        console.error("Error fetching order:", error)
        return null
    }
}

