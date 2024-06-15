import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    user: [],
    error: ''
}

export const createUser = createAsyncThunk('/create-account/user', async ({ email, username, password, firstName, lastName }) => {
    try {
        const response = await axios.post('https://stackbuild.onrender.com/api/auth/signup', { email, username, password, firstName, lastName, });
        return response.data;
    }
    catch (error) {
        throw error
    }
})

const accountSlice = createSlice({
    name: 'create-account',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false,
                    state.user = action.payload,
                    state.error = ''
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false,
                    state.user = [],
                    state.error = action.error.message
            })
    }
})

export default accountSlice.reducer