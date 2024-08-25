import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  post: [],
  error: "",
};

// Create an async thunk to fetch posts
export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await axios.get("https://stackbuild.onrender.com/api/posts");
  return response.data;
});

export const addPost = createAsyncThunk(
  "post/addPost",
  async (postData, { getState }) => {
    const token = getState().user.token || localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token available.");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'multipart/form-data', 
      },
    };

    const response = await axios.post(
      "https://stackbuild.onrender.com/api/posts/",
      postData,
      config
    );
    return response.data;
  }
);

// Action to update an existing post
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ postId, updatedPostData }) => {
    const response = await axios.put(
      `https://stackbuild.onrender.com/api/posts/${postId}`,
      updatedPostData
    );
    return response.data;
  }
);

// Action to delete a post
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId) => {
    const response = await axios.delete(
      `https://stackbuild.onrender.com/api/posts/${postId}`
    );
    return response.data;
  }
);

const postSlice = createSlice({
  name: "Posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
        state.error = "";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.post = [];
        state.error = action.error.message;
      })
      // Handle addPost, updatePost, and deletePost similarly
      .addCase(addPost.fulfilled, (state, action) => {
        state.post.push(action.payload); // Assuming the backend returns the new post
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.post.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.post[index] = action.payload; // Assuming the backend returns the updated post
        }
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.post = state.post.filter((post) => post.id !== action.meta.arg); // Assuming the post ID is passed as arg
      });
  },
});

export default postSlice.reducer;