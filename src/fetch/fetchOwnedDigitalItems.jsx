import { getAuth } from "firebase/auth"
const auth = getAuth()

export default async function fetchOwnedDigitalItems() {
    console.log("Getting owned digital items")
    const authToken = await auth.currentUser.getIdToken()
    console.log('Token:', authToken)

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
            const data = await response.json()
            console.log(data)

            return data
        }
        else throw new Error('No owned digital items found')
        
    } catch (error) {
        console.error("Error fetching owned digital items:", error)
        return null
    }
}
