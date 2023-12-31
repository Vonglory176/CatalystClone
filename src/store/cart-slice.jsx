import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import db from '../firebase';

//(Reducers specify how the application's state changes in response to actions sent to the store.)
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
                variantId: newItem.variantId,
                quantity: newItem.quantity,
                // productName: newItem.productname,
                // variantName: newItem.variantname,
                // price: newItem.price,
                // totalPrice: newItem.price,
            })
        }
        state.totalQuantity += newItem.quantity
        
        /*To fully read and log the data of an array within a Redux state that is managed by Redux Toolkit (and thus potentially wrapped in a Proxy due to Immer), you should convert the Proxies to plain JavaScript objects or arrays. This can be done by mapping over the array and copying each item. Here's the best method to do this:*/
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

    },
    replaceData(state,action) { //For checkout page changes

    }
  },
});


export const cartActions = cartSlice.actions //For reducer use

export default cartSlice //For store-index import

//ACTIONS (Payloads of information that send data from your application to your store. They are the only source of information for the store.)
//THESE ARE AUTOMATICALLY GENERATED WHEN USING REDUX-TOOLKIT, THERE IS NO NEED TO WRITE THEM
//
// export const addItemToCart = (product) => {
//     return {
//         type: "cart/addToCart",
//         payload: product
//     }
// }
// export const removeItemFromCart = (productId, variantId) => {
//     return {
//         type: "cart/removeFromCart",
//         payload: [productId, variantId]
//     }
// }