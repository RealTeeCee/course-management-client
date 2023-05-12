import { all, call } from "redux-saga/effects";
import { loginSaga } from "./login/saga";
import { userSaga } from "./user/saga";

export function* rootSaga() {
  yield all([call(loginSaga), call(userSaga)]);
}
