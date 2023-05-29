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
    errorMessage: undefined,
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
    onLoginOAuthStart: (state, action) => ({
      ...state,
      isLoading: true,
      errorMessage: undefined,
    }),
    onLoginOAuthSuccess: (state, action) => ({
      ...state,
      isLoginSuccess: true,
      isLoading: false,
      errorMessage: undefined,
    }),
    onLoginOAuthFailed: (state, action) => ({
      ...state,
      isLoginSuccess: false,
      isLoading: false,
      errorMessage: action.payload,
    }),
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
  onLoginOAuthStart,
  onLoginOAuthSuccess,
  onLoginOAuthFailed,
} = authSlice.actions;
// authReducer
export default authSlice.reducer;
