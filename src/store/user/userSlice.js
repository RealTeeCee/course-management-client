import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isUserLoading: false,
    isUpdateUserSuccess: false,
  },
  reducers: {
    onGetUsers: (state, action) => ({
      ...state,
      isUserLoading: true,
    }),
    onGetUsersSuccess: (state, action) => ({
      ...state,
      users: action.payload,
      isUserLoading: false,
    }),
    onUpdateUser: (state, action) => ({
      ...state,
      isUserLoading: true,
      isUpdateUserSuccess: false,
    }),
    onUpdateUserSuccess: (state, action) => ({
      ...state,
      isUpdateUserSuccess: action.payload,
    }),
  },
});

export const {
  onGetUsers,
  onGetUsersSuccess,
  onUpdateUser,
  onUpdateUserSuccess,
} = userSlice.actions;
// reducer
export default userSlice.reducer;
