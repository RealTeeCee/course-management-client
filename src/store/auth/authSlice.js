const { createSlice } = require("@reduxjs/toolkit");

/**
 * *Slice*
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    access_token: null,
    isLoading: false,
    isLoginSuccess: false,
  },
  reducers: {
    onLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    onLoginSuccess: (state, action) => ({
      isLoginSuccess: action.payload,
    }),
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
    onRemoveToken: (state, action) => ({}),
  },
});

export const {
  onLoading,
  onLoginSuccess,
  onLogin,
  onRegister,
  onUpdateUserToken,
  onGetUser,
  onRefreshToken,
  onRemoveToken,
} = authSlice.actions;
// authReducer
export default authSlice.reducer;
