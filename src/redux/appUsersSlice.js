// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API Call
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserApi,
} from "../@core/services/Users";
// ** Other Axios Calls (if needed)
import axios from "axios";
import toast from "react-hot-toast";

// Get all data (بدون فیلتر)
export const getAllData = createAsyncThunk("appUsers/getAllData", async () => {
  const response = await getAllUsers(); // یا پارامتر مناسب
  return response.listUser || [];
});

// Get paginated/filterable data
export const getData = createAsyncThunk("appUsers/getData", async (params) => {
  const response = await getAllUsers(params);
  return {
    params,
    data: response.listUser || [],
    totalPages: response.totalCount || 1,
  };
});
// Get single user data

export const getUser = createAsyncThunk("/User/UserDetails", async (id) => {
  const response = await getUserById(id);

  return response;
});

export const addUser = createAsyncThunk(
  "appUsers/addUser",
  async (userData, { dispatch, getState }) => {
    const response = await createUser(userData);
    if (response.success) {
      toast.success("new User Successfuly added");
    }
    await dispatch(getData(getState().users.params));
    await dispatch(getAllData());
    return response;
  }
);

export const deleteUser = createAsyncThunk(
  "appUsers/deleteUser",
  async (id, { dispatch, getState }) => {
    const response = await deleteUserById(id);
    if (response.success) {
      toast.success("new User Successfuly added");
    }
    await dispatch(getData(getState().users.params));
    await dispatch(getAllData());
    return id;
  }
);
export const updateUser = createAsyncThunk(
  "appUsers/updateUser",
  async (userData, { dispatch, getState }) => {
    const response = updateUserApi(userData);
    if (response.data.success) {
      toast.success("User updated successfully");
    }
    await dispatch(getData(getState().users.params));
    await dispatch(getAllData());
    return response.data;
  }
);

export const appUsersSlice = createSlice({
  name: "appUsers",
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.params = action.payload.params;
        state.total = action.payload.totalPages;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      });
  },
});

export default appUsersSlice.reducer;
