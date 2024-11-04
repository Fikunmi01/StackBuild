import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: {},
  error: "",
};

export const updateProfilePicture = createAsyncThunk(
  "user/updateProfilePicture",
  async ({ pictureFormData }, { rejectWithValue }) => {
    const userId = localStorage.getItem("userId");

    // Check if userId is a valid MongoDB ObjectId
    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
    if (!isValidObjectId(userId)) {
      return rejectWithValue("Invalid userId format");
    }

    console.log(userId, "userId picture");
    console.log(pictureFormData, "picture uploaded");

    try {
      const response = await axios.post(
        `https://stackbuild.onrender.com/api/user/${userId}/picture`,
        pictureFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data; // Assuming the API returns the updated user data
    } catch (error) {
      console.error("Error uploading picture:", error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/profile",
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    console.log(id, "id");
    try {
      const response = await axios.get(
        `https://stackbuild.onrender.com/api/users/me/${userId}`,
        { headers: { "x-auth-token": token } }
      );
      conole.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSlice = createSlice({
  name: "user",
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

        state.error = "";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = [];
        state.error = action.payload;
      })
      .addCase(updateProfilePicture.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Assuming the API returns the updated user object
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update profile picture";
      });
  },
});

export default fetchSlice.reducer;