// features/searchSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchText: "",
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = searchSlice.actions;

export const selectSearchText = (state) => state.search.searchText;

export default searchSlice.reducer;
