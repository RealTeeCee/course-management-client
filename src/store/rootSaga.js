import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/authSaga";
import authorSaga from "./author/authorSaga";
import courseSaga from "./course/courseSaga";
import categorySaga from "./category/categorySaga";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(authorSaga),
    fork(categorySaga),
    fork(courseSaga),
  ]);
}
