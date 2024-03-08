import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const showAndHideNotification = createAsyncThunk(
    'ui/showAndHideNotification',
    async (notification, thunkAPI) => {
        // Dispatch the action to show the notification
        thunkAPI.dispatch(uiActions.showNotification(notification));

        // Wait for 5 seconds before automatically hiding the notification
        setTimeout(() => {
            thunkAPI.dispatch(uiActions.closeNotification());
        }, 5000);
    }
)

//(Reducers specify how the application's state changes in response to actions sent to the store.)
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    notification: {
        message: '',
        linkMessage: '',
        link: '',
        type: '',
        open: false,
    }
  },

  reducers: {
    showNotification(state, action) {
        console.log("Notification being set!")
        // console.log(action.payload)

        state.notification = {
            message: action.payload.message,
            linkMessage: action.payload.linkMessage,
            link: action.payload.link,
            type: action.payload.type,
            open: true,
        }
    },

    closeNotification(state, action) {
        state.notification.open = false
    },

  },

})

export const uiActions = uiSlice.actions //For reducer use

export default uiSlice //For store-index import