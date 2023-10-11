import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    comment: {},
    error: '',
};

export const postComment = createAsyncThunk("post/postComment", async (commentData) => {
    try {
        const { postId, comment } = commentData;
        const response = await axios.post(`http://localhost:5000/post/${postId}/comment`, { text: comment });
        return response.data;
    } catch (error) {
        throw error;
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
                state.error = action.payload;
            });
    },
});

export default commentSlice.reducer;
