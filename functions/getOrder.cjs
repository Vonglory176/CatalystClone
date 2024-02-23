const admin = require('firebase-admin')

const serviceAccount = JSON.parse(process.env.VITE_FIREBASE_ADMIN)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://catalystclonedb-default-rtdb.firebaseio.com"
})

exports.handler = async function(event, context) {
    //Verifying that the request is of the correct type
    if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' }

    //Getting and saving the request Authentication Token
    const authToken = event.headers.authorization && event.headers.authorization.split('Bearer ')[1]
    if (!authToken) return { statusCode: 401, body: 'Unauthorized: No token provided' }

    let userId
    try {
        //Verifying the authToken with Firebase Admin
        const decodedToken = await admin.auth().verifyIdToken(authToken)
        userId = decodedToken.uid
        console.log("Token verified!")
    } catch (error) {
        console.error('Error Verifying auth token:', error)
        return { statusCode: 403, body: 'Unauthorized: Invalid token' }
    }

    //Verifying and saving the proper parameters
    console.log(event.queryStringParameters)
    const localSessionId = event.queryStringParameters.session_id //sessionId
    if (!localSessionId) return { statusCode: 400, body: 'Missing sessionId query parameter' }

    // const userId = event.queryStringParameters.userId //userId
    // if (!userId) return { statusCode: 400, body: 'Missing userId query parameter' }

    //Searching for matching order
    try {
        const db = admin.database()
        const ordersRef = db.ref('orders')
        const snapshot = await ordersRef.once('value')
        let orderDetails = null

        console.log(orderDetails)

        snapshot.forEach(childSnapshot => {
            const order = childSnapshot.val()
            // console.log ("SNAPSHOT", order)

            // console.log(orderData)
            // console.log(orderData.metadata)

            if (order.metadata.sessionId === localSessionId && order.metadata.userId === userId) {
                orderDetails = order
            }
        })

        // Order found
        if (orderDetails) {
            // console.log(orderDetails)
            return { statusCode: 200, body: JSON.stringify(orderDetails) }
        }

        // No order found
        else return { statusCode: 404, body: 'Order not found' }

    } catch (error) {
        console.error('Error querying order:', error)
        return { statusCode: 500, body: 'Internal Server Error' }
    }
}