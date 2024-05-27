// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "../features/userSlice";
// import searchReducer from "../features/searchSlice";

// export default configureStore({
//   reducer: {
//     user: userReducer,
//     search: searchReducer,
//   },
// });

// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import searchReducer from "../features/searchSlice";
import optionsReducer from "../features/optionsSlice"; // Import the options reducer

export default configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    options: optionsReducer, // Add options reducer to the store
  },
});
