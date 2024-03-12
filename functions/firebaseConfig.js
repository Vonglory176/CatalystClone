import { initializeApp } from "firebase/app"
import { getDatabase } from 'firebase/database'
import { getAuth } from "firebase/auth"
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js"

// const { initializeApp } = require('firebase/app')
// const { getDatabase } = require('firebase/database')
// const { getAuth } = require('firebase/auth')


const firebaseConfig = { //import.meta.env
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

// INITIALIZE FIREBASE
const firebaseApp = initializeApp(firebaseConfig)
const db = getDatabase(firebaseApp)
const auth = getAuth(firebaseApp)

export default firebaseApp

