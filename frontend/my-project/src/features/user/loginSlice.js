import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    user: {}, // Changed from an array to an object
    userProfile: {},
    error: '',
    isAuthenticated: false,
};

export const loginUser = createAsyncThunk('login/user', async ({ email, password, username }) => {
    try {
        const response = await axios.post(`https://stackbuild.onrender.com/api/auth/login/`, { email, password });
        return response.data;
    } catch (error) 
    
    
    
    
    
    
    
    
    
    {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
        return rejectWithValue(error.message);
    }
});



const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.userProfile=action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = [];
                state.isAuthenticated = false;
                state.error = action.error.message
            })
    }
})

export default loginSlice.reducer