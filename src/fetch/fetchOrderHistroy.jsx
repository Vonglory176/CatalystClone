import { getAuth } from "firebase/auth"
const auth = getAuth()

export default async function fetchOrderHistory() {
    console.log("Getting order history")
    const authToken = await auth.currentUser.getIdToken()

    try {
        //Firing serverless function to get the order history
        const response = await fetch(`/.netlify/functions/getOrderHistory`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        })

        console.log(response)
        
        // If history found, save and display
        if (response.ok) {

            // Orders found
            if (response.status === 200) {
                const data = await response.json()
                console.log(data)
                return data
            }

            // No orders present
            else if (response.status === 204) {
                console.log("No order history found")
                return null
            }
        }
        else throw new Error(`${response.status} - ${response.statusText}`)
        
    } catch (error) {
        console.error("Error fetching order history:", error)
        return null
    }
}
