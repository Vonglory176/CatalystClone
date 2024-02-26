export default async function fetchCartCheckout(cartItemList, user, customerInstructions, navigate) {
    // const { data, error } = useSWR("/api/cart/checkout", fetcher) ??
    console.log("Starting checkout")

    const response = await fetch('/.netlify/functions/checkoutCart', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({items: cartItemList, user: user, customerInstructions: customerInstructions})
    })

    if (!response.ok) {
        // Handle error response
        console.error("Error response:", response)
        return new Error ("Error response:", response)
    }
    
    const data = await response.json()
    if(data.url) window.location.replace(data.url) //Redirection to Stripe payment
}

