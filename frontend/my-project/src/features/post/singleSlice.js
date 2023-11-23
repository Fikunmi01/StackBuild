import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    singlePost: {},
    error: '',
};

export const fetchSingle = createAsyncThunk('post/fetchSingle', async (postId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/post/${postId}`, {
            headers: { 'x-auth-token': token }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const singleSlice = createSlice({
    name: 'single',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingle.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSingle.fulfilled, (state, action) => {
                state.loading = false;
                state.singlePost = action.payload;
                state.error = '';
            })
            .addCase(fetchSingle.rejected, (state, action) => {
                state.loading = false;
                state.singlePost = {};
                state.error = action.payload;
            });
    },
});

export default singleSlice.reducer;
