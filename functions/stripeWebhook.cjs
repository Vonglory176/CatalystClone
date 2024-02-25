// import { initializeApp } from "firebase/app"
// import { set, get, ref, getDatabase } from 'firebase/database'
// import { getAuth } from "firebase/auth"
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js"

// const firebaseApp = require('firebase/app')
// const firebaseAuth = require('firebase/auth')
// const firebaseDb = require('firebase/database')
// const db = require('./firebaseAdmin')
const stripe = require('stripe')(process.env.VITE_STRIPE_SECRET_KEY)
const admin = require('firebase-admin')

const serviceAccount = JSON.parse(process.env.VITE_FIREBASE_ADMIN)

if (admin.apps.length === 0) admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://catalystclonedb-default-rtdb.firebaseio.com"
})

exports.handler = async function (event, context) {

    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' } 
    }
  
    try { //ADD BETTER ERROR MESSAGES
        const data = JSON.parse(event.body)
        console.log('Stripe event received:', data)
  
        // Here, you can handle the Stripe event types you're interested in.
        // For example, if you're listening for 'checkout.session.completed' events:
        if (data.type === 'checkout.session.completed') {
            console.log("HERE 3")
            const db = admin.database()

            //Generating an order number (Comparing to current order list)
            const orderCount = await getOrderCount(db) + 1
            const orderNumber = "SHP-" + orderCount.toString().padStart(6, '0')// Format as a six-digit number
            console.log("HERE 4")
            console.log(orderNumber)

            //Getting a copy of the ordered products
            const lineItems = await stripe.checkout.sessions.listLineItems(data.data.object.id)

            //Creating data to be entered in database
            let orderDetails = {...data.data.object}
            orderDetails.metadata.orderId = orderNumber //Including OrderID w/SessionID & UserID
            orderDetails.metadata.completionTime = Math.floor(Date.now() / 1000)
            orderDetails.lineItems = lineItems.data
            orderDetails.digitalItems = JSON.parse(data.data.object.metadata.digitalItems)

            //Saving the primary order details in Firebase
            const orderRef = db.ref(`orders`)
            await orderRef.child(`${orderNumber}`).set(orderDetails)

            //Saving digital goods to user account in Firebase
            if (orderDetails.digitalItems) {
                const userRef = db.ref(`accounts/${orderDetails.metadata.userId}`)
                const snapshot = await userRef.once('value')
                console.log(snapshot.val())

                if (snapshot.val()) { //Verifying correct user
                    const user = snapshot.val()

                    const newDigitalItems = {...user.ownedDigitalItems, ...orderDetails.digitalItems}
                    await userRef.child('ownedDigitalItems').set(newDigitalItems)
                }
                else throw new Error("User could not be found!")
            }

        // Handle the event
        console.log("HERE 5")
        return { statusCode: 200, body: 'Order processed & loaded into Firebase successfully' }
      }
  
      return { statusCode: 200, body: 'Event processed' }
    } catch (error) {
      console.error('Error processing Stripe webhook:', error)
      return { statusCode: 400, body: 'Webhook Error' }
    }

    async function getOrderCount(db) {
        console.log("Getting order number") //MAKE MORE ROBUST, CHECK FOR DUPLICATES

        const ordersCountRef = db.ref('orders')
        // const snapshot = await ordersCountRef.get(db, ordersCountRef)
        const snapshot = await ordersCountRef.once('value', (snapshot) => {
            console.log("SNAPSHOT")
            console.log(snapshot.val())
        })

        if (snapshot.exists()) {
            const snap = Object.keys(snapshot.val())
            console.log("SNAP", snap)
            return snap.length
        } else {
            return 0 // If there's no count stored, start with 0
        }
    }
}

/*
Request from ::1: POST /.netlify/functions/stripeWebhook
Stripe event received: {
  id: 'evt_1OmOnGGPwfdOja8uWbcKlskv',
  object: 'event',
  api_version: '2023-10-16',
  created: 1708556497,
  data: {
    object: {
      id: 'cs_test_b1b8qSTbcPNvLZjqkzTpKSVdRthDQUH7quGVH6FyF7M6QVtt10GH7b9UJ3',
      object: 'checkout.session',
      after_expiration: null,
      allow_promotion_codes: null,
      amount_subtotal: 13997,
      amount_total: 15215,
      automatic_tax: [Object],
      billing_address_collection: null,
      cancel_url: 'http://localhost:8888/cancel?session_id=8e5fe1bc-7540-4531-b664-d7343a489816',
      client_reference_id: null,
      client_secret: null,
      consent: null,
      consent_collection: null,
      created: 1708556463,
      currency: 'usd',
      currency_conversion: null,
      custom_fields: [],
      custom_text: [Object],
      customer: null,
      customer_creation: 'if_required',
      customer_details: [Object],
      customer_email: null,
      expires_at: 1708642863,
      invoice: null,
      invoice_creation: [Object],
      livemode: false,
      locale: null,
      metadata: [Object],
      mode: 'payment',
      payment_intent: 'pi_3OmOnDGPwfdOja8u0eratzxV',
      payment_link: null,
      payment_method_collection: 'if_required',
      payment_method_configuration_details: null,
      payment_method_options: {},
      payment_method_types: [Array],
      payment_status: 'paid',
      phone_number_collection: [Object],
      recovered_from: null,
      setup_intent: null,
      shipping_address_collection: [Object],
      shipping_cost: [Object],
      shipping_details: [Object],
      shipping_options: [Array],
      status: 'complete',
      submit_type: null,
      subscription: null,
      success_url: 'http://localhost:8888/success?session_id=8e5fe1bc-7540-4531-b664-d7343a489816',
      tax_id_collection: [Object],
      total_details: [Object],
      ui_mode: 'hosted',
      url: null
    }
  },
  livemode: false,
  pending_webhooks: 2,
  request: { id: null, idempotency_key: null },
  type: 'checkout.session.completed'
}
Response with status 200 in 10 ms.
*/