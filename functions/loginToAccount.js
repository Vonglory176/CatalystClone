import db from "./firebaseAdmin.js"

// functions/loginToAccount.js
exports.handler = async function (event, context) {
  // Assuming the request body is JSON and comes in the event.body
  const { email, password } = JSON.parse(event.body)
  
  if (!email || !password) {
    return { 
      statusCode: 400, 
      body: JSON.stringify({ error: 'Email and password are required.' }) }
  }
  
  try {
    //Getting the list of accounts in the db and filtering it to find a matching email
    const accountsRef = db.ref('accounts')
    const snapshot = await accountsRef.orderByChild('email').equalTo(email).once('value')
    
    //If an email was found
    if (snapshot.exists()) {
      const accounts = snapshot.val()
      const accountKeys = Object.keys(accounts)
      console.log(accounts)

      //ITERATE ACCOUNT MUMBO JUMBO
      
      accountKeys.find(key => key.password === "")

      for (let key of accountKeys) {
        const account = accounts[key]
        // In a real application, you should hash passwords and compare the hashed values
        if (account.password === password) {
          // Successful login
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Login successful', account }) }
        }
      }
      // Incorrect password
      return { statusCode: 401, body: JSON.stringify({ error: 'Incorrect password.' }) }
    } else {
      // No account found with the provided email
      return { statusCode: 404, body: JSON.stringify({ error: 'Account not found.' }) }
    }
  } catch (error) {
    console.error('Login error:', error)
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error.' }) }
  }
}

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