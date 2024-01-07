import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import db from '../firebase';
import { getProductById } from '../hooks/getProductById';
import { useSelector } from 'react-redux';

//ACTIONS (Payloads of information that send data from your application to your store. They are the only source of information for the store.)
export const addItemToCart = (product) => {
    return {
        type: "cart/addToCart",
        payload: product
    }
}
export const removeItemFromCart = (productId, variantId) => {
    return {
        type: "cart/removeFromCart",
        payload: [productId, variantId]
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
        console.log("HERE!")
        
        const newItem = action.payload
        console.log(newItem)

        //Checking if item is already in cart
        const existingItem = state.cartItemList.find(item => item.productId === newItem.productId && item.variantId === newItem.variantId)
        console.log(existingItem)

        if (existingItem) {
            existingItem.quantity += newItem.quantity
            // existingItem.totalPrice += newItem.price
        }
        else {
            state.cartItemList.push ({
                productId: newItem.productId,
                productName: newItem.productname,
                variantId: newItem.variantId,
                variantName: newItem.variantname,
                // price: newItem.price,
                // totalPrice: newItem.price,
                quantity: newItem.quantity,
            })
        }
        state.totalQuantity += newItem.quantity
        // console.log(state.cartItemList)
        console.log(Array.from(state.cartItemList));
        // or
        console.log([...state.cartItemList]);
        console.log(state.cartItemList.map(item => ({ ...item })));

        console.log(state.totalQuantity)
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
    changeCartItemQuantity(state,action) { //For checkout page changes

    }
  },
});


export const cartActions = cartSlice.actions //For reducer use

export default cartSlice //For store-index import