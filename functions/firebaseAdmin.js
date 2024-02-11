/* Initialize the Admin SDK: In your serverless function, initialize the Firebase Admin SDK. 
You'll need to generate a private key file for your Firebase project in the Firebase console under: 
Project Settings > Service accounts > Generate new private key. */

// var serviceAccount = require(process.env.VITE_FIREBASE_ADMIN);
//const serviceAccount = require('./path/to/service-account-file.json');

// var admin = require("firebase-admin")
// const serviceAccount = process.env.VITE_FIREBASE_ADMIN

import admin from 'firebase-admin'
const serviceAccount = JSON.parse(process.env.VITE_FIREBASE_ADMIN)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://catalystclonedb-default-rtdb.firebaseio.com"
})

export default db = admin.database()