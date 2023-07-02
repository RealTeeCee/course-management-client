import { takeLatest } from "redux-saga/effects";
import {
  handleOnBulkDeleteQuestion,
  handleOnDeleteQuestion,
  handleOnGetQuestionsByCourseId,
  handleOnPostQuestion,
} from "./questionHandlers";
import {
  onBulkDeleteQuestion,
  onDeleteQuestion,
  onGetQuestionsByPartId,
  onPostQuestion,
} from "./questionSlice";

export default function* questionSaga() {
  yield takeLatest(onGetQuestionsByPartId.type, handleOnGetQuestionsByCourseId);
  yield takeLatest(onPostQuestion.type, handleOnPostQuestion);
  yield takeLatest(onDeleteQuestion.type, handleOnDeleteQuestion);
  yield takeLatest(onBulkDeleteQuestion.type, handleOnBulkDeleteQuestion);
}
