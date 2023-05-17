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
    onUpdateUser: (state, action) => ({
      ...state,
      user: action.payload.user,
      access_token: action.payload.access_token,
    }),
    onGetUser: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    onRefreshToken: (state, action) => ({
      
    })
  },
});

export const { onLogin, onRegister, onUpdateUser, onGetUser } =
  authSlice.actions;
// authReducer
export default authSlice.reducer;
