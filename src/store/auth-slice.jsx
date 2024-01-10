import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        user: null
    }, 
    reducers: {
        login(state) {
            state.isLoggedIn = true //Toolkit automatically makes this a copy of state, so it's not mutating the original copy
        },
        logout(state) {
            state.isLoggedIn = false
        }
    }
})

export const authActions = authSlice.actions //For reducer use

export default authSlice //For store-index import

//useSelector is for getting info
//useDispatch is for doing something