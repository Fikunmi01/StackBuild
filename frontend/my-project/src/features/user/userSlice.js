import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    user: [],
    error: ''
}

export const fetchUser = createAsyncThunk('user/profile', async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    console.log(id, 'id')
    try {
        const response = await axios.get(`https://stackbuild.onrender.com/api/users/me/${userId}`, { headers: { 'x-auth-token': token } });
        conole.log(response.data)
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
        return rejectWithValue(error.message);
    }
});

export const fetchSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.id = action.payload.user._id; // Set state.user.id here

                state.error = '';
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.user = [];
                state.error = action.payload;
            });
    }
});

export default fetchSlice.reducer;