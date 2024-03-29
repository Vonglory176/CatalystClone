//VIDEO --> https://youtu.be/_8M-YVY76O8

// import Stripe from 'stripe';
// const stripe = Stripe(import.meta.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')(`${process.env.VITE_STRIPE_SECRET_KEY}`)
const { v4: uuidv4 } = require('uuid')

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
        const { items, user, customerInstructions } = JSON.parse(event.body)
        console.log(items)

        //Determining shipping info
        const isPhysical = Object.values(items).find(item => item.isPhysical)

        //Keeping track of digital goods
        const digitalItems = JSON.stringify(Object.values(items).map(item => {
          if (item.isDigital) {
            return {
              productId: item.productId, 
              variantId: item.variantId
            }
          }
        }))
        

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
          success_url: `${process.env.VITE_RETURN_DOMAIN}/cart/success?session_id=${sessionId}`,
          cancel_url: `${process.env.VITE_RETURN_DOMAIN}/cart`, //cancel?session_id=${sessionId}
          automatic_tax: {
              enabled: true
          },
          tax_id_collection: {
              enabled: true
          },
          billing_address_collection: 'auto',

          shipping_address_collection: !isPhysical? 
            {} : //No shipping if all digital items
            {allowed_countries: ['US'] }, //, 'CA'

          shipping_options: !isPhysical? 
            [] : //No shipping if all digital items
            [
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {
                    amount: 0,
                    currency: 'usd',
                  },
                  display_name: 'Free shipping',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 1,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 2,
                    },
                  },
                },
              },
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {
                      amount: 700,
                      currency: 'usd',
                  },
                  display_name: 'Ground Shipping',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 5,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 7,
                    },
                  },
              },
            },
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 1500,
                  currency: 'usd',
                },
                display_name: 'Next day air',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 1,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 1,
                  },
                },
              },
            },
          ],
          // invoice_creation: { // TEST!!
          //         enabled: true
          //     },
          metadata: {
              sessionId: sessionId,
              userId: user && user.userId? user.userId : null,
              customerInstructions: customerInstructions,
              digitalItems: digitalItems
          }
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