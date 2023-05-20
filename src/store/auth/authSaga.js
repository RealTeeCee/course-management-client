import { takeLatest } from "redux-saga/effects";
import {
  handleOnLogin,
  handleOnRegister,
  handleOnRefreshToken,
  handleOnRemoveToken,
} from "./authHandlers";
import { onLogin, onRefreshToken, onRegister, onRemoveToken } from "./authSlice";

/**
 * *** Saga ***
 * after declare a Saga, assign into rootSaga
 */
export default function* authSaga() {
  yield takeLatest(onRegister.type, handleOnRegister);
  yield takeLatest(onLogin.type, handleOnLogin);
  yield takeLatest(onRefreshToken.type, handleOnRefreshToken);
  yield takeLatest(onRemoveToken.type, handleOnRemoveToken);

  
}
