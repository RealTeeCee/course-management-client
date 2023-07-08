import { all, fork } from "redux-saga/effects";
import answerSaga from "./admin/answer/answerSaga";
import partSaga from "./admin/part/partSaga";
import questionSaga from "./admin/question/questionSaga";
import authSaga from "./auth/authSaga";
import authorSaga from "./author/authorSaga";
import courseSaga from "./course/courseSaga";
import userSaga from "./admin/user/userSaga";
import adminCourseSaga from "./admin/course/courseSaga";
import categorySaga from "./category/categorySaga";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(authorSaga),
    fork(categorySaga),
    fork(courseSaga),
    fork(partSaga),
    fork(questionSaga),
    fork(answerSaga),
    fork(userSaga),
    fork(adminCourseSaga),
  ]);
}
