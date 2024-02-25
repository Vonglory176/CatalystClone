const admin = require('firebase-admin')
const serviceAccount = JSON.parse(process.env.VITE_FIREBASE_ADMIN)

if (admin.apps.length === 0) admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://catalystclonedb-default-rtdb.firebaseio.com"
})
const db = admin.database()

exports.handler = async function(event, context) {
    //Verifying request type
    if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' }

    //Getting and saving the request Authentication Token
    const authToken = event.headers.authorization && event.headers.authorization.split('Bearer ')[1]
    if (!authToken) return { statusCode: 401, body: 'Unauthorized: No token provided' }

    let authUserId
    try {
        //Verifying the authToken with Firebase Admin
        const decodedToken = await admin.auth().verifyIdToken(authToken)
        authUserId = decodedToken.uid
        console.log("Token verified!")
    } catch (error) {
        console.error('Error Verifying auth token:', error)
        return { statusCode: 403, body: 'Unauthorized: Invalid token' }
    }

    //Searching for matching orders
    try {
        const ordersRef = db.ref('orders')
        const snapshot = await ordersRef.once('value')
        let orderHistory = []

        //Adding each order with a matching userId
        snapshot.forEach(childSnapshot => {
            const order = childSnapshot.val()
            if (order.metadata && order.metadata.userId === authUserId) orderHistory.push(order)
        })

        // Orders were found
        if (orderHistory.length > 0) return { statusCode: 200, body: JSON.stringify(orderHistory) }

        // No orders were found
        else return { statusCode: 404, body: 'No previous orders found' }

    } catch (error) {
        console.error('Error querying order:', error)
        return { statusCode: 500, body: 'Internal Server Error' }
    }
}