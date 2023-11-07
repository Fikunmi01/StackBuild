import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    comment: {},
    error: '',
};

export const postComment = createAsyncThunk("post/postComment", async ({ text, postId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:5000/post/${postId}/comment`, { text, postId });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }

});



const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(postComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comment = action.payload;
                state.error = '';
            })
            .addCase(postComment.rejected, (state, action) => {
                state.loading = false;
                state.comment = {};
                state.error = action.error.message;
            });
    },
});

export default commentSlice.reducer;
