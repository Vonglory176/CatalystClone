import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const db = getDatabase();

export const insertData = createAsyncThunk(
  'firebase/insertData',
  async (data, thunkAPI) => {
    // Insert data into Firebase
    // You can dispatch other actions within this function
    // Return the result or throw an error
  }
);

export const selectData = createAsyncThunk(
  'firebase/selectData',
  async (data, thunkAPI) => {
    // Select data from Firebase
  }
);

export const updateData = createAsyncThunk(
  'firebase/updateData',
  async (data, thunkAPI) => {
    // Update data in Firebase
  }
);

export const deleteData = createAsyncThunk(
  'firebase/deleteData',
  async (data, thunkAPI) => {
    // Delete data from Firebase
  }
);

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertData.fulfilled, (state, action) => {
        // handle the state change when insertData is fulfilled
      })
      .addCase(selectData.fulfilled, (state, action) => {
        // handle the state change when selectData is fulfilled
      })
      .addCase(updateData.fulfilled, (state, action) => {
        // handle the state change when updateData is fulfilled
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        // handle the state change when deleteData is fulfilled
      });
  },
});

export default firebaseSlice.reducer;

/*
When using Firebase in a React application, there are a few things you should keep in mind:

1. Firebase Initialization: Firebase should be initialized only once in your application. This is typically done in your root component or a separate configuration file.

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // your config here
};

const app = initializeApp(firebaseConfig);

2. Use of React Hooks: Firebase operations can be asynchronous, so you might want to use React's useState and useEffect hooks to handle Firebase data.

3. Realtime Updates: Firebase provides realtime updates. You can set up listeners to your Firebase data in useEffect and clean them up when the component unmounts.

4. Error Handling: Always handle potential errors when making calls to Firebase. This can be done using try/catch blocks for promises or error callbacks for Firebase's onSnapshot method.

5. Security Rules: Ensure that you have set up appropriate security rules for your Firebase project to prevent unauthorized access.

6. Environment Variables: Sensitive information such as Firebase project credentials should be stored in environment variables and not hard-coded into your application.

7. Firebase Libraries: Import only the Firebase libraries that you need in order to keep your bundle size small.

Remember to install the necessary Firebase libraries using npm or yarn, and import them in your files as needed. For example, if you're using Firestore, you would do:

import { getFirestore } from "firebase/firestore";

And then initialize it:

import { getFirestore } from "firebase/firestore";

Then you can use db to make calls to your Firestore database.
*/

/*
    // INSERT Data ----------------------------------------------------------
        function InsertData() {
        set(ref(db, "TheStudents/"+ rollbox.value), {
            NameOfStd: namebox.value,
            RollNo: rollbox.value,
            Section: secbox.value,
            Gender: genbox.value,
        })
        .then(()=>{
            alert("Data was stored successfully")
        })
        .catch((error)=>{
            alert("Unsuccessful, Error: " + error)
        })
        }

        // SELECT Data ----------------------------------------------------------
        function SelectData(){
        const dbref = ref(db)

        fet(child(dbref,"TheStudents/"+ rollbox.value)).then(snapshot => {
            if (snapshot.exist()) {
            namebox.value = snapshot.val().NameOfStd
            secbox.value = snapshot.val().Section
            genbox.value = snapshot.val().Gender
            }
            else {
            alert("No data found")
            }
        })
        .catch(error => {
            alert("Unsuccessful, Error: " + error)
        })
        }

        // UPDATE Data ----------------------------------------------------------
        function UpdateData() {
        update(ref(db, "TheStudents/" + rollbox.value), {
            NameOfStd: namebox.value,
            Section: secbox.value,
            Gender: genbox.value
        })
        .then(() => {
            alert("Data updated successfully")
        })
        .catch(error => {
            alert("Unsuccessful, Error: " + error)
        })
        }

        // DELETE Data ----------------------------------------------------------
        function DeleteData() {
        remove(ref(db, "TheStudents/" + rollbox.value))
        .then(() => {
            alert("Data deleted successfully")
        })
        .catch(error => {
            alert("Unsuccessful, Error: " + error)
        })
        }
*/