import { appCheck } from "firebase-admin";
import admin from "./firebaseAdmin.js"

exports.handler = async function(event, context) {
    // Parse the request body to get account details
    const { email, password, firstName, lastName } = JSON.parse(event.body);
  
    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and password are required.' })
      };
    }
  
    try {
        // Create a new user account
        const userRecord = await admin.auth().createUser({
            email: email,
            emailVerified: false, // You can set this to true if you handle email verification elsewhere
            password: password,
            // firstName: firstName,
            //displayName: displayName,
            disabled: false,
        });
    
        // Respond with the created user record, but filter out sensitive information
        const { uid, email: userEmail, firstName: userFirstName, lastName: userLastName } = userRecord;
        return {
            statusCode: 200,
            body: JSON.stringify({ uid, email: userEmail, firstName: firstName, lastName: lastName })
        };
    } catch (error) {
        console.error('Error creating new user:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to create new user.' })
        };
    }
  };

/* Create User Accounts: Use the Admin SDK to create user accounts. You can create a new Netlify 
function that listens for POST requests to create new users.*/

// exports.handler = async (event) => {
//     if (event.httpMethod !== 'POST') {
//       return { statusCode: 405, body: 'Method Not Allowed' };
//     }
  
//     try {
//       const { email, password } = JSON.parse(event.body);
//       const userRecord = await admin.auth().createUser({
//         email,
//         password,
//       });
  
//       return {
//         statusCode: 200,
//         body: JSON.stringify({ userId: userRecord.uid }),
//       };
//     } catch (error) {
//       return { statusCode: 500, body: error.message };
//     }
//   };