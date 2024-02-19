//VIDEO --> https://youtu.be/_8M-YVY76O8

// import Stripe from 'stripe';
// const stripe = Stripe(import.meta.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')(`${process.env.VITE_STRIPE_SECRET_KEY}`)
const { v4: uuidv4 } = require('uuid')
const firebaseAuth = require('firebase/auth')
const firebaseDb = require('firebase/database')

// export async function handler(event, context) {
exports.handler = async function (event, context) {
    //Only allowing POST for CheckOut
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" })
        }
    }

    {/* 
        req.body.items 
        [
            {
                id: 1,
                quantity: 3
            }
        ]
        
        stripe wants 
        [
            {
                price: 1,
                quantity: 3
            }
        ]
    */}
    
    try {
        // Generating a session UUID
        const sessionId = uuidv4()
        console.log(sessionId)

        //Getting the posted user data
        const { items, user } = JSON.parse(event.body)
        // console.log(user)

        //Setting default address to be sent to Stripe
        // let defaultAddress = {} 
        // if (user && user.address && user.address.length > 0) {
        //     defaultAddress = user.address.find(address => { return address.isDefaultAddress })
        //     defaultAddress === -1? user.address[0] : defaultAddress
        // }

        //Formatting data to adhere to Stripe standards
        let lineItems = items.map(item => ({ //"lineItems" is the Stripe term for items/products
            price: item.stripeId,
            quantity: item.quantity
        }))
        console.log(lineItems)

        //Creating session with newly formatted lineItems
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            // customer: userID, //Remove?
            mode: 'payment',
            success_url: `${process.env.VITE_RETURN_DOMAIN}/success?session_id=${sessionId}`,
            cancel_url: `${process.env.VITE_RETURN_DOMAIN}/cancel?session_id=${sessionId}`,
            automatic_tax: {
                enabled: true
            },
            tax_id_collection: {
                enabled: true
            },
            shipping_address_collection: {
                allowed_countries: ['US', 'CA']
            },
            invoice_creation: { // TEST!!
                enabled: true
            },
            metadata: {
                sessionId: sessionId
            }
        })

        //Saving a session copy, generating UUID and sending both to Firebase
        // const db = firebaseDb.getDatabase()
        // const ref = firebaseDb.ref(db, `sessions/${sessionId}`)

        // const newSessionRef = await firebaseDb.set(ref, {
        //     stripeSessionId: session,
        //     userId: user.userId
        // })
        // const newSessionKey = newSessionRef.key

        // console.log(newSessionKey)
        // console.log(session)

        // const calculation = await stripe.tax.calculations.create({
        //     currency: 'usd',
        //     customer_details: {
        //       address: {
        //         line1: '920 5th Ave',
        //         city: 'Seattle',
        //         state: 'WA',
        //         postal_code: '98104',
        //         country: 'US',
        //       },
        //       address_source: 'shipping',
        //     },
        //     line_items: [
        //       {
        //         amount: 4999,
        //         tax_code: 'txcd_10000000',
        //         reference: 'Music Streaming Coupon',
        //       },
        //     ],
        //     shipping_cost: {
        //       amount: 700,
        //     },
        //     expand: ['line_items'],
        //   })
        //   console.log(calculation)


        //Sending created session URL to frontend for checkout
        return {
            statusCode: 200,
            body: JSON.stringify({url: session.url})
        }
    }
    catch(error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify({message: error.message})
        }
    }
}

// ------------------------------------------------------------------

// ORIGINAL SERVER CODE STARTS HERE !!!
// KEEP THIS FOR LEARNING PURPOSES

//(npm i express cors stripe)

// ------------------------------------------------------------------

// import Stripe from 'stripe';
// import express from 'express';
// import cors from 'cors';

// // const express = require('express')
// // var cors = require('cors')
// // const stripe = require('stripe')('STRIPE SECRET KEY GOES HERE !!!')

// //VIDEO --> https://youtu.be/_8M-YVY76O8

// const stripe = Stripe(STRIPE_SECRET_KEY GOES HERE);

// const app = express()
// app.use(cors())
// app.use(express.static("public"))
// app.use(express.json())

// app.post("/checkout", async (req, res) => {

//     /*
//        req.body.items 
//        [
//             {
//                 id: 1,
//                 quantity: 3
//             }
//        ]
       
//        stripe wants 
//        [
//             {
//                 price: 1,
//                 quantity: 3
//             }
//        ]
//      */
    
//     //Getting the posted user data
//     console.log(req.body)
//     const items = req.body.items
    
//     //Formatting data to adhere to Stripe standards
//     let lineItems = [] //"lineItems" is the Stripe term for items/products
//     items.forEach((item) => {
//         lineItems.push(
//             {
//                 price: item.stripeId,
//                 quantity: item.quantity
//             }
//         )
//     })
//     console.log(lineItems)

//     //Creating session with newly formatted lineItems
//     const session = await stripe.checkout.sessions.create({
//         line_items: lineItems,
//         mode: 'payment',
//         success_url: "http://localhost:3000/success",
//         cancel_url: "http://localhost:3000/cancel"
//     })

//     //Sending created session URL to frontend for checkout
//     res.send(JSON.stringify({
//         url: session.url
//     }))
// })

// app.listen(4000, () => console.log("Listening on port 4000!"))