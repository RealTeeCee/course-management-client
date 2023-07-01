import { takeLatest } from "redux-saga/effects";
import {
  handleOnLoadAuthorsPagination,
  handleOnLoadSubcribesByUserId,
  handleOnLoadTop3Authors,
  handleOnSubcribeAuthor,
} from "./authorHandlers";
import {
  onLoadAuthorsPagination,
  onLoadSubcribesByUserId,
  onLoadTop3Authors,
  onSubcribeAuthor,
} from "./authorSlice";

export default function* authSaga() {
  yield takeLatest(onLoadTop3Authors.type, handleOnLoadTop3Authors);
  yield takeLatest(onLoadAuthorsPagination.type, handleOnLoadAuthorsPagination);
  yield takeLatest(onLoadSubcribesByUserId.type, handleOnLoadSubcribesByUserId);
  yield takeLatest(onSubcribeAuthor.type, handleOnSubcribeAuthor);
}
