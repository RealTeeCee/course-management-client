import { all, takeLatest } from "redux-saga/effects";
import { handleOnSectionLoading } from "./sectionHandlers";
import { onSectionLoading } from "./sectionSlice";

/**
 * *** Saga ***
 * after declare a Saga, assign into rootSaga
 */
export default function* sectionSaga() {
  yield all([takeLatest(onSectionLoading.type, handleOnSectionLoading)]);
}
