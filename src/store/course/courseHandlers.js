import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { showMessageError } from "../../utils/helper";
import {
  requestCourse,
  requestEnrollId,
  requestLearning,
  requestLoadTracking,
  requestMyCourse,
  requestSaveTracking,
} from "./courseRequests";
import {
  onCourseFailed,
  onCourseSuccess,
  onGetEnrollIdSuccess,
  onGetLearningSuccess,
  onGetTrackingLesson,
  onGetTrackingLessonSuccess,
  onMyCourseFailed,
  onMyCourseSuccess,
  onSaveTrackingLessonSuccess,
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
      yield put(onSaveTrackingLessonSuccess(res.data));
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
};
