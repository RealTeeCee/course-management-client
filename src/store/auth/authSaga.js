import { takeLatest } from "redux-saga/effects";
import {
  handleOnLogin,
  handleOnRegister,
  handleRefreshToken,
} from "./authHandlers";
import { onLogin, onRefreshToken, onRegister } from "./authSlice";

/**
 * *** Saga ***
 * after declare a Saga, assign into rootSaga
 */
export default function* authSaga() {
  yield takeLatest(onRegister.type, handleOnRegister);
  yield takeLatest(onLogin.type, handleOnLogin);
  yield takeLatest(onRefreshToken.type, handleRefreshToken);
}
