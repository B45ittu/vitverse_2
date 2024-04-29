import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import searchReducer from "../features/searchSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
});