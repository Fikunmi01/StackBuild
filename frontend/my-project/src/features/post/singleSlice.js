import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  singlePost: [],
  error: "",
};

export const fetchSingle = createAsyncThunk(
  "post/fetchSingle",
  async (_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://stackbuild.onrender.com/api/posts/${_id}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      console.log("Fetch Single Response:", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const singleSlice = createSlice({
  name: "single",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingle.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingle.fulfilled, (state, action) => {
        state.loading = false;
        state.singlePost = Array.isArray(action.payload) ? action.payload : [action.payload];
        state.error = "";
      })
      .addCase(fetchSingle.rejected, (state, action) => {
        state.loading = false;
        state.singlePost = [];
        state.error = action.payload;
      });
  },
});

export default singleSlice.reducer;