import { all, fork } from "redux-saga/effects";
import partSaga from "./admin/part/partSaga";
import authSaga from "./auth/authSaga";
import courseSaga from "./course/courseSaga";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(courseSaga), fork(partSaga)]);
}
