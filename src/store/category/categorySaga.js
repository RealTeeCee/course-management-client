import { takeLatest } from "redux-saga/effects";
import { handleOnLoadCategories } from "./categoryHandlers";
import { onLoadCategories } from "./categorySlice";

export default function* authSaga() {
  yield takeLatest(onLoadCategories.type, handleOnLoadCategories);
}
