import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  searchedItem: [],
  error: "",
};

export const searchPost = createAsyncThunk("search/", (value) =>
  axios
    .get(`https://stackbuild.onrender.com/api/posts?search=${value}`)
    .then((response) => response.data)
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedItem = action.payload;
        state.error = "";
      })
      .addCase(searchPost.rejected, (state, action) => {
        state.loading = false;
        state.searchedItem = [];
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;