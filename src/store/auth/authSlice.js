const { createSlice } = require("@reduxjs/toolkit");

/**
 * *Slice*
 */
const initialState = {
  user: null,
  access_token: null,
  isLoading: false,
  isLoginSuccess: false,
  errorMessage: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: { ...initialState },
  reducers: {
    onLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    onLoginSuccess: (state, action) => ({
      ...state,
      isLoginSuccess: action.payload,
    }),
    onLogin: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    onRegister: (state, action) => ({
      ...initialState,
      ...action.payload,
    }),
    onUpdateUserToken: (state, action) => ({
      ...state,
      user: action.payload.user,
      access_token: action.payload.access_token,
    }),
    onGetUser: (state, action) => {
      console.log("onGetUser: action: ", action);
      return ({
        ...state,
        access_token: action.payload,
      })
    },
    onRefreshToken: (state, action) => ({
      ...state,
      access_token: action.payload,
    }),
    onRemoveToken: (state, action) => ({
      ...initialState,
    }),
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
