import { getAuth } from "firebase/auth"
const auth = getAuth()

export default async function fetchOwnedDigitalItems() {
    console.log("Getting owned digital items")
    const authToken = await auth.currentUser.getIdToken()

    try {
        //Firing serverless function to get the order history
        const response = await fetch(`/.netlify/functions/getOwnedDigitalItems`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        })

        console.log(response)
        
        // If owned digital items found, save and display
        if (response.ok) {
            // Digital-Items found
            if (response.status === 200) {
                const data = await response.json()
                console.log(data)
                return data
            }

            // No Digital-Items present
            else if (response.status === 204) {
                console.log("No digital items found")
                return null
            }
        }
        else throw new Error(`${response.status} - ${response.statusText}`)
        
    } catch (error) {
        console.error("Error fetching owned digital items:", error)
        return null
    }
}
