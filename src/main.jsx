import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./style/index.css"
import { Provider } from 'react-redux'
import store, { persistor } from './store/index.jsx'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename={"/"}> {/*CatalystClone*/}
          <App/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
