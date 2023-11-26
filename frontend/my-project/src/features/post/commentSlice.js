import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    comment: {},
    error: '',
};

export const postComment = createAsyncThunk("post/postComment", async ({ text, postId, username }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`http://localhost:5000/post/${postId}/comment`, { text, postId, username }, {
            headers: { 'x-auth-token': token }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }

});


export const likeComment = createAsyncThunk("comment/likeComment", async ({ postId, commentId,isLiked }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`http://localhost:5000/post/${postId}/like`, { commentId }, {
            headers: { 'x-auth-token': token }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const quoteComment = createAsyncThunk("comment/quoteComment", async ({ postId, commentId, quote }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`http://localhost:5000/post/${postId}/quote`, { commentId, quote }, {
            headers: { 'x-auth-token': token }
        });
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
            })
            .addCase(likeComment.pending, (state) => {
                state.loading = true;
            })
            builder.addCase(likeComment.fulfilled, (state, action) => {
                const comment = state.comments.find(comment => comment._id === action.payload.commentId);
                if (comment) {
                  if (action.payload.isLiked) {
                    comment.likes--;
                  } else {
                    comment.likes++;
                  }
                }
              })
            .addCase(likeComment.rejected, (state, action) => {
                state.loading = false;
                state.comment = {};
                state.error = action.error.message;
            })
            .addCase(quoteComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(quoteComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comment = action.payload;
                state.error = '';
            })
            .addCase(quoteComment.rejected, (state, action) => {
                state.loading = false;
                state.comment = {};
                state.error = action.error.message;
            });
    },
});

export default commentSlice.reducer;
