import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    post: [],
    error: ''
};

// Create an async thunk to fetch users
export const fetchPosts = createAsyncThunk('post/', () => {
    return axios
        .get('http://localhost:5000/post')
        .then((response) => response.data);
});

// Action to add a new post
export const addPost = (postData) => createAsyncThunk('post/create-post', () => {
    return axios
        .post('http://localhost:5000/post/create-post', postData)
        .then((response) => response.data);
});

// Action to update an existing post
export const updatePost = (postId, updatedPostData) => createAsyncThunk('post/update-post', () => {
    return axios
        .put(`http://localhost:5000/post/update-post/${postId}`, updatedPostData)
        .then((response) => response.data);
});

// Action to delete a post
export const deletePost = (postId) => createAsyncThunk('post/delete-post', () => {
    return axios
        .delete(`http://localhost:5000/post/delete-post/${postId}`)
        .then((response) => response.data)

});


const postSlice = createSlice({
    name: 'Posts',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.post = action.payload;
                state.error = '';
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.post = [];
                state.error = action.error.message;
            });
    
    },
});


export default postSlice.reducer;