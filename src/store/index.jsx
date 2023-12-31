import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./auth-slice"
import firebaseSlice from "./firebase-slice"

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        firebase: firebase-slice.reducer
    }
})

export default store