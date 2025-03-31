import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toastify } from "../../components/toast";

export const getAdmin = createAsyncThunk(
  "fetchAdmin/getAdmin",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/users/${id}`);
      return data;
    } catch (error) {
      const { rejectWithValue } = thunkApi;
      return rejectWithValue(error.message);
    }
  }
);

export const updateAdminPassword = createAsyncThunk(
  "fetchAdmin/updateAdminPassword",
  async ({values , id}, thunkApi) => {
    try {
      const { data } = await axios.patch(`http://localhost:3000/users/${id}` , {password: values.password});
      toastify("Password updated successfully", "success");
      return data;
    } catch (error) {
      const { rejectWithValue } = thunkApi;
      return rejectWithValue(error.message);
    }
  }
);

export const adminSlice = createSlice({
  name: "fetchAdmin",
  initialState: { loading: false, error: "", data: {} },
  extraReducers: (builder) => {
    builder.addCase(getAdmin.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    });
    builder.addCase(getAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateAdminPassword.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateAdminPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    });
    builder.addCase(updateAdminPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default adminSlice.reducer;
