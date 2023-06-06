import { call, put } from "redux-saga/effects";
import { showMessageError } from "../../utils/helper";
import {
  requestCourse,
  requestEnrollId,
  requestLearning,
  requestLoadProgress,
  requestLoadTracking,
  requestMyCourse,
  requestSaveTracking,
  requestUpdateCompleted,
} from "./courseRequests";
import {
  onCourseFailed,
  onCourseSuccess,
  onGetEnrollIdSuccess,
  onGetLearningSuccess,
  onGetTrackingLessonSuccess,
  onLoadProgressSuccess,
  onMyCourseFailed,
  onMyCourseSuccess,
  onSaveTrackingLessonSuccess,
  onSaveTrackingVideoSuccess,
  onUpdateCompletedVideoSuccess,
} from "./courseSlice";

/**
 * *** Handler ***
 */
function* handleOnMyCourseLoading(action) {
  try {
    const res = yield call(requestMyCourse, action.payload);

    if (res.status === 200) {
      yield put(onMyCourseSuccess(res.data));
    } else {
      yield put(onMyCourseFailed(res.data));
    }
  } catch (error) {
    showMessageError(error);
  }
}

function* handleOnCourseLoading() {
  try {
    const res = yield call(requestCourse);

    if (res.status === 200) {
      yield put(onCourseSuccess(res.data));
    } else {
      yield put(onCourseFailed(res.data));
    }
  } catch (error) {
    showMessageError(error);
  }
}
function* handleOnGetEnrollId({ payload }) {
  try {
    const res = yield call(requestEnrollId, payload);

    if (res.status === 200) {
      yield put(onGetEnrollIdSuccess(res.data));
    }
  } catch (error) {
    showMessageError(error);
  }
}
function* handleOnGetLearning({ payload }) {
  try {
    const res = yield call(requestLearning, payload);

    if (res.status === 200) {
      yield put(onGetLearningSuccess(res.data));
    }
  } catch (error) {
    showMessageError(error);
  }
}
function* handleOnGetTrackingLesson({ payload }) {
  try {
    const res = yield call(requestLoadTracking, payload);
    console.log(res.data);
    if (res.status === 200) {
      yield put(onGetTrackingLessonSuccess(res.data));
    }
  } catch (error) {
    showMessageError(error);
  }
}
function* handleOnSaveTrackingLesson({ payload }) {
  try {
    const res = yield call(requestSaveTracking, payload);

    if (res.status === 200) {
      yield put(onSaveTrackingLessonSuccess());
    }
  } catch (error) {
    showMessageError(error);
  }
}
function* handleOnSaveTrackingVideo({ payload }) {
  try {
    const res = yield call(requestSaveTracking, payload);

    if (res.status === 200) {
      yield put(onSaveTrackingVideoSuccess());
    }
  } catch (error) {
    showMessageError(error);
  }
}
function* handleOnUpdateCompletedVideo({ payload }) {
  try {
    const res = yield call(requestUpdateCompleted, payload);
    if (res.status === 200) {
      yield put(onUpdateCompletedVideoSuccess(res.data));
    }
  } catch (error) {
    showMessageError(error);
  }
}

function* handleLoadProgress({ payload }) {
  try {
    const res = yield call(requestLoadProgress, payload);
    if (res.status === 200) {
      yield put(onLoadProgressSuccess(res.data));
    }
  } catch (error) {
    showMessageError(error);
  }
}

export {
  handleOnMyCourseLoading,
  handleOnCourseLoading,
  handleOnGetEnrollId,
  handleOnGetLearning,
  handleOnGetTrackingLesson,
  handleOnSaveTrackingLesson,
  handleOnSaveTrackingVideo,
  handleOnUpdateCompletedVideo,
  handleLoadProgress,
};
