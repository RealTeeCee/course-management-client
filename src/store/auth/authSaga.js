import { takeLatest } from "redux-saga/effects";
import { handleOnLogin, handleOnRegister } from "./authHandlers";
import { onLogin, onRegister } from "./authSlice";

/**
 * *** Saga ***
 * after declare a Saga, assign into rootSaga
 */
export default function* authSaga() {
  yield takeLatest(onRegister.type, handleOnRegister);
  yield takeLatest(onLogin.type, handleOnLogin);
}
