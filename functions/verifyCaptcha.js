exports.handler = async function(event, context) {
    // Parse the incoming POST data
    const data = JSON.parse(event.body)
    const token = data.token
    const secretKey = process.env.VITE_RECAPTCHA_SECRET_KEY // Use your secret key here
    console.log("SECRET KEY" + secretKey)

    console.log("TOKEN: " + token)

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`

    try {
        const response = await fetch(verificationUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        const body = await response.json()
        console.log(body)

        if (body.success) {
            return {
                statusCode: 200,
                body: JSON.stringify({"responseCode" : 0, "responseDesc" : "Success"})
            }
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({"responseCode" : 1, "responseDesc" : "Failed captcha verification"})
            }
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: "Internal Server Error"})
        }
    }
}

// const request = require('request')

// exports.handler = async function(event, context) {
//     // Parse the incoming POST data
//     const data = JSON.parse(event.body)
//     const token = data.token

//     return new Promise((resolve, reject) => {
//         const secretKey = process.env.VITE_RECAPTCHA_SITE_TEST_KEY // Use your secret key here
//         const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`

//         request(verificationUrl, function(error, response, body) {
//             if (error) {
//                 resolve({
//                     statusCode: 500,
//                     body: JSON.stringify({error: "Internal Server Error"})
//                 })
//             } else {
//                 body = JSON.parse(body)
//                 if (body.success) {
//                     resolve({
//                         statusCode: 200,
//                         body: JSON.stringify({"responseCode" : 0, "responseDesc" : "Success"})
//                     })
//                 } else {
//                     resolve({
//                         statusCode: 200,
//                         body: JSON.stringify({"responseCode" : 1, "responseDesc" : "Failed captcha verification"})
//                     })
//                 }
//             }
//         })
//     })
// };