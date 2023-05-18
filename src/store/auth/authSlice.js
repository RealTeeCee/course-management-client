const { createSlice } = require("@reduxjs/toolkit");

/**
 * *Slice*
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    access_token: null,
  },
  reducers: {
    onLogin: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    onRegister: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    onUpdateUserToken: (state, action) => ({
      ...state,
      user: action.payload.user,
      access_token: action.payload.access_token,
    }),
    onGetUser: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    onRefreshToken: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { onLogin, onRegister, onUpdateUserToken, onGetUser, onRefreshToken } =
  authSlice.actions;
// authReducer
export default authSlice.reducer;
