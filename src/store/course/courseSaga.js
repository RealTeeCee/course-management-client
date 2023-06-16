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
  handleLoadNote,
  handleSaveNote,
  handleDeleteNote,
} from "./courseHandlers";
import {
  onBestSellerCourseLoading,
  onCourseLoading,
  onDeleteNote,
  onFreeCourseLoading,
  onGetEnrollId,
  onGetLearning,
  onGetTrackingLesson,
  onLoadNote,
  onLoadProgress,
  onManualSelectedLesson,
  onMyCourseLoading,
  onRelatedCourseLoading,
  onSaveNote,
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
    takeLatest(onLoadNote.type, handleLoadNote),
    takeLatest(onSaveNote.type, handleSaveNote),
    takeLatest(onDeleteNote.type, handleDeleteNote),
  ]);
}
