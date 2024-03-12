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

import firebaseApp from '../functions/firebaseConfig' //Import initializes the database

const auth = getAuth()

const AppWrapper = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const maintainLoginStatus = onAuthStateChanged(auth, async (user) => {
      
      if (user) { // When user is signed in
        dispatch(fetchUserDetails()) //Keep details up to date
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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered: ', registration.scope)
      })
      .catch(error => {
        console.error('Service Worker registration failed: ', error)
      })
  })
}