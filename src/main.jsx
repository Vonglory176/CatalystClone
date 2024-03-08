import React from 'react'
import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./style/index.css"
import store, { persistor } from './store/index.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { fetchUserDetails } from './store/auth-slice.jsx'
import { Provider, useDispatch } from 'react-redux'

import firebaseApp from '../functions/firebaseConfig'

const auth = getAuth()

const AppWrapper = () => {
  const dispatch = useDispatch()

  useEffect(() => {    
    const maintainLoginStatus = onAuthStateChanged(auth, async (user) => {
      // User is signed in
      if (user) {
        dispatch(fetchUserDetails())
      }
    })

    // Cleanup on unmount
    return () => maintainLoginStatus()
  }, []) //dispatch

  return <App/>
}
        
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename={`${import.meta.env.VITE_PUBLIC_URL}`}> {/*basename={`${import.meta.env.VITE_PUBLIC_URL}`} "/CatalystClone"*/}
        <AppWrapper/>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>,
)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   // <React.StrictMode></React.StrictMode>,
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <BrowserRouter basename={`${import.meta.env.VITE_PUBLIC_URL}`}> {/*basename={`${import.meta.env.VITE_PUBLIC_URL}`} "/CatalystClone"*/}
//         <App/>
//       </BrowserRouter>
//     </PersistGate>
//   </Provider>,
// )

// import { initializeApp } from "firebase/app"
// import { getDatabase } from 'firebase/database'
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js"

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
// }

// // INITIALIZE FIREBASE
// const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
// const db = getDatabase()