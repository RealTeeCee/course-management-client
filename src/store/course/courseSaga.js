import { all, takeLatest } from "redux-saga/effects";
import {
  handleOnCourseLoading,
  handleOnMyCourseLoading,
  handleOnGetEnrollId,
  handleOnGetLearning,
  handleOnSaveTrackingLesson,
  handleOnGetTrackingLesson,
  handleOnSaveTrackingVideo,
  handleOnUpdateCompletedVideo,
  handleLoadProgress,
  handleOnFreeCourseLoading,
  handleOnBestSellerCourseLoading,
  handleOnRelatedCourseLoading,
  handleOnManualSelectedLesson,
} from "./courseHandlers";
import {
  onBestSellerCourseLoading,
  onCourseLoading,
  onFreeCourseLoading,
  onGetEnrollId,
  onGetLearning,
  onGetTrackingLesson,
  onLoadProgress,
  onManualSelectedLesson,
  onMyCourseLoading,
  onRelatedCourseLoading,
  onSaveTrackingLesson,
  onSaveTrackingVideo,
  onUpdateCompletedVideo,
} from "./courseSlice";

/**
 * *** Saga ***
 * after declare a Saga, assign into rootSaga
 */
export default function* courseSaga() {
  yield all([
    takeLatest(onMyCourseLoading.type, handleOnMyCourseLoading),
    takeLatest(onCourseLoading.type, handleOnCourseLoading),
    takeLatest(onFreeCourseLoading.type, handleOnFreeCourseLoading),
    takeLatest(onBestSellerCourseLoading.type, handleOnBestSellerCourseLoading),
    takeLatest(onRelatedCourseLoading.type, handleOnRelatedCourseLoading),
    takeLatest(onGetEnrollId.type, handleOnGetEnrollId),
    takeLatest(onGetLearning.type, handleOnGetLearning),
    takeLatest(onManualSelectedLesson.type, handleOnManualSelectedLesson),
    takeLatest(onGetTrackingLesson.type, handleOnGetTrackingLesson),
    takeLatest(onSaveTrackingLesson.type, handleOnSaveTrackingLesson),
    takeLatest(onSaveTrackingVideo.type, handleOnSaveTrackingVideo),
    takeLatest(onUpdateCompletedVideo.type, handleOnUpdateCompletedVideo),
    takeLatest(onLoadProgress.type, handleLoadProgress),
  ]);
}
