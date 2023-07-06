import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isLoading: false,
    isUpdateUserSuccess: false,
  },
  reducers: {
    onLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    onGetUsers: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    onGetUsersSuccess: (state, action) => ({
      ...state,
      users: action.payload,
      isLoading: false,
    }),
    onUpdateUser: (state, action) => ({
      ...state,
      isLoading: true,
      isUpdateUserSuccess: false,
    }),
    onUpdateUserSuccess: (state, action) => ({
      ...state,
      isUpdateUserSuccess: action.payload,
    }),
  },
});

export const {
  onLoading,
  onGetUsers,
  onGetUsersSuccess,
  onUpdateUser,
  onUpdateUserSuccess,
} = userSlice.actions;
// reducer
export default userSlice.reducer;
