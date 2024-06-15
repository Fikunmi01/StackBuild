import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData, {rejectWithValue, getState}) => {
    try {
      // Ensure this line correctly points to where your accessToken is stored
      const token = getState().auth.token;
      const response = await axios.patch(`https://stackbuild.onrender.com/api/user/update`, userData, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const updateSlice = createSlice({
  name: 'user',
  initialState: { entity: null, loading: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entity = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload.message;
      });
  },
});

export default updateSlice.reducer;