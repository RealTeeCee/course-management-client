import { takeLatest } from "redux-saga/effects";
import {
  handleOnLogin,
  handleOnRegister,
  handleOnRefreshToken,
  handleOnRemoveToken,
  handleOnGetUser,
  handleOnForgetPassword,
  handleOnResetPassword,
  handleOnUserChangePassword,
} from "./authHandlers";
import {
  onLogin,
  onRefreshToken,
  onRegister,
  onRemoveToken,
  onGetUser,
  onForgetPassword,
  onResetPassword,
  onUserChangePassword,
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
}
