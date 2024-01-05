import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import db from '../firebase';
import { getProductById } from '../hooks/getProductById';

//ACTIONS (Payloads of information that send data from your application to your store. They are the only source of information for the store.)
export const addToCart = (item) => {
    return {
        type: "ADD_TO_CART",
        payload: item
    }
}
export const removeFromCart = (itemId) => {
    return {
        type: "REMOVE_FROM_CART",
        payload: itemId
    }
}

//SLICE / REDUCER STUFF (Reducers specify how the application's state changes in response to actions sent to the store.)
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItemList: [],
    totalQuantity: 0,
    cartChanged:false,
  },
  reducers: {
    addToCart(state,action) {
        state.cartChanged = true //For later cart/account use

        const newItem = action.payload

        //Checking if item is already in cart
        const existingItem = getProductById(newItem.id)

        if (existingItem) {
            existingItem.quantity += newItem.quantity
            existingItem.totalPrice += newItem.price
        }
        else {
            state.cartItemList.push ({
                id: newItem.id,
                name: newItem.name,
                price: newItem.price,
                totalPrice: newItem.price,
                quantity: newItem.quantity,
            })
        }
        state.totalQuantity += newItem.quantity
    },
    removeFromCart(state,action) {
        state.cartChanged = true //For later cart/account use

        const id = action.payload
        const existingItem = state.itemsList.find(item => item.id === id)

        if (existingItem.quantity === 1) {
            state.itemsList = state.itemsList.filter(item => item.id !== id)
        }
        else {
            existingItem.quantity--
            existingItem.totalPrice -= existingItem.price
        }
        state.totalQuantity--
    },
  },
});


export const cartActions = cartSlice.actions //For reducer use

export default cartSlice //For store-index import