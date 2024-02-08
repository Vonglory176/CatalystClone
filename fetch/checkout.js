//VIDEO --> https://youtu.be/_8M-YVY76O8

import Stripe from 'stripe';
const stripe = Stripe(import.meta.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
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
        //Getting the posted user data
        const { items } = JSON.parse(event.body)
        console.log(items)

        //Formatting data to adhere to Stripe standards
        let lineItems = items.map(item => ({ //"lineItems" is the Stripe term for items/products
            price: item.stripeId,
            quantity: item.quantity
        }))
        console.log(lineItems)

        //Creating session with newly formatted lineItems
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        })

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

// Stripe - Secret Key
// sk_test_51OhJeJGPwfdOja8uC9GHavCmXBG0HKEbxsZCHpAbezCDrqUWUvmZSw8I2RrdVZV6WhzGwdvCEYtv8gK4J0vTzLCO00jaVYF0Ah

//Clan Invasion: price_1OhJrKGPwfdOja8u6dwTgMr6
//Reinforcements Clan Invasion: price_1OhJu2GPwfdOja8uR5V98KZQ

// const express = require('express')
// var cors = require('cors')
// const stripe = require('stripe')('sk_test_51OhJeJGPwfdOja8uC9GHavCmXBG0HKEbxsZCHpAbezCDrqUWUvmZSw8I2RrdVZV6WhzGwdvCEYtv8gK4J0vTzLCO00jaVYF0Ah')

// import Stripe from 'stripe';
// import express from 'express';
// import cors from 'cors';

//VIDEO --> https://youtu.be/_8M-YVY76O8

// // const express = require('express')
// // var cors = require('cors')
// // const stripe = require('stripe')('sk_test_51OhJeJGPwfdOja8uC9GHavCmXBG0HKEbxsZCHpAbezCDrqUWUvmZSw8I2RrdVZV6WhzGwdvCEYtv8gK4J0vTzLCO00jaVYF0Ah')

// //VIDEO --> https://youtu.be/_8M-YVY76O8

// import express from 'express';
// import cors from 'cors';
// import Stripe from 'stripe';

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