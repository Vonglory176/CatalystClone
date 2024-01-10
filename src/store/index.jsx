import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authSlice from "./auth-slice"
import productsSlice from "./products-slice"
import cartSlice from "./cart-slice"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth', 'cart']
}

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)

export default store

// const store = configureStore({
//     reducer: {
//         auth: authSlice.reducer,
//         products: productsSlice.reducer,
//         cart: cartSlice.reducer,
//     }
// })