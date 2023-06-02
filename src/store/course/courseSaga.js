import { all, takeLatest } from "redux-saga/effects";
import {
  handleOnCourseLoading,
  handleOnMyCourseLoading,
  handleOnGetEnrollId,
  handleOnGetLearning,
  handleOnSaveTrackingLesson,
  handleOnGetTrackingLesson,
} from "./courseHandlers";
import {
  onCourseLoading,
  onGetEnrollId,
  onGetLearning,
  onGetTrackingLesson,
  onMyCourseLoading,
  onSaveTrackingLesson,
} from "./courseSlice";

/**
 * *** Saga ***
 * after declare a Saga, assign into rootSaga
 */
export default function* courseSaga() {
  yield all([
    takeLatest(onMyCourseLoading.type, handleOnMyCourseLoading),
    takeLatest(onCourseLoading.type, handleOnCourseLoading),
    takeLatest(onGetEnrollId.type, handleOnGetEnrollId),
    takeLatest(onGetLearning.type, handleOnGetLearning),
    takeLatest(onGetTrackingLesson.type, handleOnGetTrackingLesson),
    takeLatest(onSaveTrackingLesson.type, handleOnSaveTrackingLesson),
  ]);
}
