import admin from "./firebaseAdmin.js"
// import db from "./firebaseAdmin.js"
// import * as admin from 'firebase-admin';
// const db = admin.database()

export async function handler(event, context) {
  const { email, password } = JSON.parse(event.body)

  if (!email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Email and password are required.' })
    }
  }

  try {
    // Use Firebase Authentication to verify the user's credentials
    const userRecord = await admin.auth().getUserByEmail(email)
    /* You now have the user's UID, which you can use to manage user-specific data
    Note: Firebase Authentication automatically handles password verification
    during the login process, so you don't need to manually compare passwords

    Assuming you have a signInWithEmailAndPassword function on the client-side
    that handles the actual authentication process

    If you need to perform additional checks or fetch user data from your database,
    you can do so here using the userRecord.uid to query your database */

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Login successful', uid: userRecord.uid })
      // Consider what user-specific data you need to return here
      // Avoid returning sensitive data
    }
  } catch (error) {
    console.error('Login error:', error)

    // Firebase Authentication errors for reference:
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials.' }) }
    } else {
      return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error.' }) }
    }
  }
}

// functions/loginToAccount.js
// exports.handler = async function (event, context) {
//   // Assuming the request body is JSON and comes in the event.body
//   const { email, password } = JSON.parse(event.body)
  
//   if (!email || !password) {
//     return { 
//       statusCode: 400, 
//       body: JSON.stringify({ error: 'Email and password are required.' }) }
//   }

//   const test = await admin.auth().getUsers([])
//   console.log(test)
  
//   try {
//     //Getting the list of accounts in the db and filtering it to find a matching email
//     const accountsRef = db.ref('accounts')
//     const snapshot = await accountsRef.orderByChild('email').equalTo(email).once('value')
    
//     //If an email was found
//     if (snapshot.exists()) {
//       const accounts = snapshot.val()
//       const accountKeys = Object.keys(accounts)
//       // console.log(accounts)

//       //ITERATE ACCOUNT MUMBO JUMBO

//       accountKeys.find(key => key.password === "")

//       for (let key of accountKeys) {
//         const account = accounts[key]
//         // In a real application, you should hash passwords and compare the hashed values
//         if (account.password === password) {
//           // Successful login
//           return {
//             statusCode: 200,
//             body: JSON.stringify({ message: 'Login successful', account }) }
//         }
//       }
//       // Incorrect password
//       return { statusCode: 401, body: JSON.stringify({ error: 'Incorrect password.' }) }
//     } else {
//       // No account found with the provided email
//       return { statusCode: 404, body: JSON.stringify({ error: 'Account not found.' }) }
//     }
//   } catch (error) {
//     console.error('Login error:', error)
//     return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error.' }) }
//   }
// }

/* Authentication and Authorization: For user login, you can use Firebase Authentication on the 
client side. To protect your Netlify functions, you can verify the Firebase ID token sent from the 
client with the Admin SDK.
*/

// exports.handler = async (event) => {
//     const idToken = event.headers.authorization;
//     try {
  //       const decodedToken = await admin.auth().verifyIdToken(idToken);
  //       const uid = decodedToken.uid;
//       // Proceed with function logic for authenticated user
//     } catch (error) {
  //       return { statusCode: 401, body: 'Unauthorized' };
  //     }
  //   };