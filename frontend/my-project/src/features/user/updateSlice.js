import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData, { rejectWithValue }) => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const { ...updateData } = userData; // Extract userId and prepare the rest of the data for the request body
    try {
      const response = await axios.patch(`https://stackbuild.onrender.com/api/user/${userId}/update`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Update Error:', error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const updateSlice = createSlice({
  name: 'update',
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