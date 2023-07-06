import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isLoading: false,
    isPostUserSuccess: false,
  },
  reducers: {
    onLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    onGetUsers: (state, action) => ({
      ...state,
      isLoading: true,
      isPostUserSuccess: false,
    }),
    onGetAllUsers: (state, action) => ({
      ...state,
      isLoading: true,
      isPostUserSuccess: false,
    }),
    onGetUsersSuccess: (state, action) => ({
      ...state,
      users: action.payload,
      isLoading: false,
    }),
    onCreateUser: (state, action) => ({
      ...state,
      isLoading: true,
      isPostUserSuccess: false,
    }),
    onUpdateUser: (state, action) => ({
      ...state,
      isLoading: true,
      isPostUserSuccess: false,
    }),
    onPostUserSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      isPostUserSuccess: action.payload,
    }),
  },
});

export const {
  onLoading,
  onGetUsers,
  onGetAllUsers,
  onGetUsersSuccess,
  onCreateUser,
  onUpdateUser,
  onPostUserSuccess,
} = userSlice.actions;
// reducer
export default userSlice.reducer;
