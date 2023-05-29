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
    data: undefined,
  },
  reducers: {
    onLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    onLoginSuccess: (state, action) => ({
      ...state,
      isLoginSuccess: action.payload, //Ko copy state cũ sẽ gây ra lỗi selector ko đc
    }),
    onLogin: (state, action) => ({
      ...state, //Copy lại state hiện tại
      ...action.payload, // Chỗ này add thêm các props mới vào state hiện tại (ko cập nhật từ state cũ),
      //sửa lại phải xác định payload là gì để cập nhật lại state
      //data: action.payload -> cập nhật lại state cũ và chỉ thay đổi data
    }),
    onRegister: (state, action) => ({
      ...state,
      ...action.payload, //tương tự
    }),
    onUpdateUserToken: (state, action) => ({
      ...state,
      user: action.payload.user,
      access_token: action.payload.access_token, //Chỗ này chỉ lưu accessToken. ko lưu refreshToken tại sao?
    }),
    onGetUser: (state, action) => ({
      ...state,
      ...action.payload, //tương tự
    }),
    onRefreshToken: (state, action) => ({
      ...state,
      ...action.payload, //tương tự
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
