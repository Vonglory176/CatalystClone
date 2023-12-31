// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFP57S5UbjkIIu5LsLiuXg8zOnYez_tnY",
    authDomain: "catalystclonedb.firebaseapp.com",
    projectId: "catalystclonedb",
    storageBucket: "catalystclonedb.appspot.com",
    messagingSenderId: "329411819610",
    appId: "1:329411819610:web:fb63c9e5020cdca64dc063",
    measurementId: "G-ZCV28QEM3Z"
};

// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

export default db;