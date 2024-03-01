export default async function fetchCaptchaVerification(token) {
    // Sending Token for verification
    const response = await fetch('/.netlify/functions/verifyCaptcha', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
    })

    // Handle error response
    if (!response.ok) {         
        console.error("Error response:", response)
        return new Error ("Error response:", response)
    }

    // Returning response code
    const captchaData = await response.json()
    return captchaData.responseCode
}