import { getAuth } from "firebase/auth"
const auth = getAuth()

export default async function fetchOrderHistory() {
    console.log("Getting order history")
    const authToken = await auth.currentUser.getIdToken()
    console.log('Token:', authToken)

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
            const data = await response.json()
            console.log(data)

            return data
        }
        else throw new Error('No order history found')
        
    } catch (error) {
        console.error("Error fetching order history:", error)
        return null
    }
}
