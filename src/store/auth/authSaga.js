import { takeLatest } from "redux-saga/effects";
import {
  handleOnForgetPassword, handleOnGetUser, handleOnLogin, handleOnRefreshToken, handleOnRegister, handleOnRemoveToken, handleOnResetPassword,
  handleOnUserChangePassword, handleOnUserUpdateProfile
} from "./authHandlers";
import {
  onForgetPassword, onGetUser, onLogin,
  onRefreshToken,
  onRegister,
  onRemoveToken, onResetPassword,
  onUserChangePassword, onUserUpdateProfile
} from "./authSlice";

/**
 * after declare a Saga, assign into rootSaga
 */
export default function* authSaga() {
  yield takeLatest(onRegister.type, handleOnRegister);
  yield takeLatest(onLogin.type, handleOnLogin);
  yield takeLatest(onRefreshToken.type, handleOnRefreshToken);
  yield takeLatest(onRemoveToken.type, handleOnRemoveToken);
  yield takeLatest(onGetUser.type, handleOnGetUser);
  yield takeLatest(onForgetPassword.type, handleOnForgetPassword);
  yield takeLatest(onResetPassword.type, handleOnResetPassword);
  yield takeLatest(onUserChangePassword.type, handleOnUserChangePassword);
  yield takeLatest(onUserUpdateProfile.type, handleOnUserUpdateProfile);
}
