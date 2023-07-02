import { takeLatest } from "redux-saga/effects";
import {
  handleOnBulkDeleteAnswer,
  handleOnDeleteAnswer,
  handleOnGetAnswersByCourseId,
  handleOnPostAnswer,
} from "./answerHandlers";
import {
  onBulkDeleteAnswer,
  onDeleteAnswer,
  onGetAnswersByPartId,
  onPostAnswer,
} from "./answerSlice";

export default function* answerSaga() {
  yield takeLatest(onGetAnswersByPartId.type, handleOnGetAnswersByCourseId);
  yield takeLatest(onPostAnswer.type, handleOnPostAnswer);
  yield takeLatest(onDeleteAnswer.type, handleOnDeleteAnswer);
  yield takeLatest(onBulkDeleteAnswer.type, handleOnBulkDeleteAnswer);
}
