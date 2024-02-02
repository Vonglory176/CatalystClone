import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import "./style/index.css"
import { Provider } from 'react-redux'
import store, { persistor } from './store/index.jsx'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter> {/*basename={`${import.meta.env.VITE_PUBLIC_URL}`} "/CatalystClone"*/}
          <App/>
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
