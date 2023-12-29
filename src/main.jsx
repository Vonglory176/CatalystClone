import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./style/index.css"
import { Provider } from 'react-redux'
import store from './store/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={"/"}> {/*CatalystClone*/}
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
