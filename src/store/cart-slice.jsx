import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"
import { showAndHideNotification } from './ui-slice' //uiActions
// import db from '../firebase';

export const addToCartAsync = createAsyncThunk(
    'cart/addToCartAsync',
    async (item, thunkAPI) => {
        
        try {
            // Add item to Cart
            thunkAPI.dispatch(cartActions.addToCart(item))

            // Create an outcome notification
            thunkAPI.dispatch(showAndHideNotification({
                message: 'Item added to cart!',
                linkMessage: 'View your cart and checkout',
                link: '/cart',
                type: 'success'
            }))
        } catch (error) {
            // Handle any errors that occur during the add to cart process
            console.error('Failed to add item to cart:', error)

            // Dispatch a failure notification
            thunkAPI.dispatch(showAndHideNotification({
                message: 'Failed to add item to cart. Please try again.',
                type: 'error'
            }))

            // Optionally, you can return a rejected action with a custom error message or object
            // return thunkAPI.rejectWithValue('Failed to add item to cart')
        }
  
        // Optionally return something to handle in extraReducers
        return item
    }
  )

//(Reducers specify how the application's state changes in response to actions sent to the store.)
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItemList: [],
    cartChanged:false,
    // totalQuantity: 0,
    // cartTotalPrice: 0
  },
  reducers: {
    addToCart(state,action) {        
        const newItem = action.payload
        console.log(newItem)

        //Checking if item is already in cart
        const existingItem = state.cartItemList.find(item => item.productId === newItem.productId && item.variantId === newItem.variantId)
        // console.log(existingItem)

        //Update item if already in cart
        try {
            if (existingItem) {
                existingItem.quantity += newItem.quantity
                // existingItem.totalPrice += newItem.price
            }
            else {
                //Push new item if not already in cart
                state.cartItemList.push ({
                    productId: newItem.productId,
                    variantId: newItem.variantId,
                    stripeId: newItem.stripeId,
                    isDigital: newItem.isDigital,
                    isPhysical: newItem.isPhysical,
                    quantity: newItem.quantity,
                    // productName: newItem.productname,
                    // variantName: newItem.variantname,
                    // price: newItem.price,
                    // totalPrice: newItem.price,
                })
            }
            // return true

        } catch (error) {
            console.error(error)
            // return false
        }
        // console.log(state.cartItemList.map(item => ({ ...item })))
    },
    removeFromCart(state,action) {
        state.cartChanged = true //For later cart/account use

        const removedItem = action.payload
        const existingItem = state.cartItemList.find(item => item.productId === removedItem.productId && item.variantId === removedItem.variantId)
        
        if (existingItem.quantity === 1 || removedItem.quantity === "all") {
            state.cartItemList = state.cartItemList.filter(item => 
                !(item.productId === removedItem.productId && item.variantId === removedItem.variantId)
                )
        }
        else {
            existingItem.quantity--
            // existingItem.totalPrice -= existingItem.price
        }
        // state.totalQuantity--
        // console.log("REMOVED!")
        console.log(state.cartItemList.map(item => ({ ...item })));
    },
    clearCartItems(state,action) {
        state.cartItemList = []
        console.log('Cart items cleared!')
    }
    // changeCartItemQuantity(state,action) { //For checkout page changes

    // },
    // replaceData(state,action) { //For checkout page changes

    // }
  },

//   extraReducers: (builder) => { //For post action changes
//     builder       

// //// ACCOUNT RETRIEVAL //////////////////////////////////////////////////////////////////////////////

//     //Retrieval Success
//     .addCase(addToCart.fulfilled, (state, action) => {
//         console.log(action.payload)
//         if (action.payload !== null) {
            
//         }
//     })
//     //Retrieval Failure
//     .addCase(addToCart.rejected, (state, action) => {
//         state.error = action.error.message
//         state.status = 'Account fetch failed'
//         console.error(state.error)
//     })

//     },
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