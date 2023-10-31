import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    searchedItem: [],
    error: '',

}

export const searchPost = createAsyncThunk('search/', async (q) => {
    try {
        const response = await axios.get(`http://localhost:5000/search?q=${q}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

const searchSlice = createSlice({
    name: 'searched item',
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
                state.error = '';
            })
            .addCase(searchPost.rejected, (state, action) => {
                state.loading = false;
                state.searchedItem = [];
                state.error = action.error.message
            })
    }
})

export default searchSlice.reducer