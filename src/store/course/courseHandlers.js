import { call, put, delay } from "redux-saga/effects";
import { showMessageError } from "../../utils/helper";
import {
  requestBestSellerCourse,
  requestCourse,
  requestDeleteNote,
  requestDeletePost,
  requestDeleteReply,
  requestEnrollId,
  requestFreeCourse,
  requestLearning,
  requestLoadCourseRating,
  requestLoadNote,
  requestLoadNotification,
  requestLoadProgress,
  requestLoadTracking,
  requestMyCourse,
  requestReadAllNotification,
  requestReadNotification,
  requestRelatedCourse,
  requestSaveLike,
  requestSaveNote,
  requestSavePost,
  requestSaveReply,
  requestSaveTrackingLesson,
  requestSaveTrackingVideo,
  requestUpdateCompleted,
  requestUpdateUserRating,
} from "./courseRequests";
import {
  onBestSellerCourseSuccess,
  onCourseFailed,
  onCourseSuccess,
  onDeleteNoteSuccess,
  onFreeCourseSuccess,
  onGetEnrollIdSuccess,
  onGetLearningSuccess,
  onGetTrackingLessonSuccess,
  onLoadCourseRatingSuccess,
  onLoadNoteSuccess,
  onLoadNotificationSuccess,
  onLoadProgressSuccess,
  onManualSelectedLessonSuccess,
  onMyCourseFailed,
  onMyCourseSuccess,
  onReadAllNotificationSuccess,
  onReadNotificationSuccess,
  onRelatedCourseSuccess,
  onSaveNoteSuccess,
  onSavePostSuccess,
  onSaveReplyToPostSuccess,
  onSaveTrackingVideoSuccess,
  onUpdateCompletedVideoSuccess,
  onUpdateUserRatingSuccess,
} from "./courseSlice";
import { toast } from "react-toastify";

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
    console.log(error);
  }
}
function* handleOnFreeCourseLoading() {
  try {
    const res = yield call(requestFreeCourse);

    if (res.status === 200) {
      yield put(onFreeCourseSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* handleOnBestSellerCourseLoading() {
  try {
    const res = yield call(requestBestSellerCourse);

    if (res.status === 200) {
      yield put(onBestSellerCourseSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* handleOnRelatedCourseLoading({ payload }) {
  try {
    const res = yield call(requestRelatedCourse, payload);

    if (res.status === 200) {
      yield put(onRelatedCourseSuccess(res.data));
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
    yield delay(2500);
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
      const { lessonId } = res.data;
      if (lessonId === 0) {
        yield put(onGetTrackingLessonSuccess(null));
      } else {
        yield put(onGetTrackingLessonSuccess(res.data));
      }
    }
  } catch (error) {
    showMessageError(error);
  }
}
function* handleOnManualSelectedLesson({ payload }) {
  try {
    const res = yield call(requestLoadTracking, payload);
    console.log(res.data);
    if (res.status === 200) {
      // const { resumePoint } = res.data;
      yield put(onManualSelectedLessonSuccess(res.data));
    }
  } catch (error) {
    showMessageError(error);
  }
}
function* handleOnSaveTrackingLesson({ payload }) {
  try {
    const res = yield call(requestSaveTrackingLesson, payload);

    if (res.status === 200) {
      const { lessonId } = res.data;
      if (lessonId === 0) {
        yield put(onGetTrackingLessonSuccess(null));
      } else {
        yield put(onGetTrackingLessonSuccess(res.data));
      }
    }
  } catch (error) {}
}
function* handleOnSaveTrackingVideo({ payload }) {
  try {
    const res = yield call(requestSaveTrackingVideo, payload);

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
function* handleLoadNote({ payload }) {
  try {
    const res = yield call(requestLoadNote, payload);
    if (res.status === 200) {
      yield put(onLoadNoteSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
    showMessageError(error);
  }
}
function* handleSaveNote({ payload }) {
  try {
    const res = yield call(requestSaveNote, payload);
    console.log(res.data);
    if (res.status === 200) {
      yield put(onSaveNoteSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
    showMessageError(error);
  }
}

function* handleDeleteNote({ payload }) {
  try {
    const res = yield call(requestDeleteNote, payload);
    if (res.status === 200) {
      yield put(onDeleteNoteSuccess(payload));
    }
  } catch (error) {
    console.log(error);
    showMessageError(error);
  }
}

function* handleSavePost({ payload }) {
  try {
    const res = yield call(requestSavePost, payload);
    if (res.status === 200) {
      yield put(onSavePostSuccess());
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleDeletePost({ payload }) {
  try {
    const res = yield call(requestDeletePost, payload);
    if (res.status === 200) {
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleSaveReplyToPost({ payload }) {
  try {
    const res = yield call(requestSaveReply, payload);
    if (res.status === 200) {
      yield put(onSaveReplyToPostSuccess());
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleRemoveReplyInPost({ payload }) {
  try {
    const res = yield call(requestDeleteReply, payload);
    if (res.status === 200) {
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleSaveLikeOfPost({ payload }) {
  try {
    const res = yield call(requestSaveLike, payload);
    if (res.status === 200) {
    }
  } catch (error) {
    console.log(error);
  }
}
function* handleLoadNotification({ payload }) {
  try {
    const res = yield call(requestLoadNotification, payload);
    console.log(res.data);
    if (res.status === 200) {
      yield put(onLoadNotificationSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* handleReadNotification({ payload }) {
  try {
    const res = yield call(requestReadNotification, payload);
    if (res.status === 200) {
      yield put(onReadNotificationSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* handleReadAllNotification({ payload }) {
  try {
    const res = yield call(requestReadAllNotification, payload);
    if (res.status === 200) {
      yield put(onReadAllNotificationSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleUpdateUserRating({ payload }) {
  try {
    const res = yield call(requestUpdateUserRating, payload);
    if (res.status === 200) {
      yield put(onUpdateUserRatingSuccess(payload.rating));
      toast.success("Thank for your rating.");
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleLoadCourseRating({ payload }) {
  try {
    const res = yield call(requestLoadCourseRating, payload);
    if (res.status === 200) {
      yield put(onLoadCourseRatingSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
    showMessageError(error);
  }
}

export {
  handleLoadNote,
  handleLoadProgress,
  handleOnBestSellerCourseLoading,
  handleOnCourseLoading,
  handleOnFreeCourseLoading,
  handleOnGetEnrollId,
  handleOnGetLearning,
  handleOnGetTrackingLesson,
  handleOnManualSelectedLesson,
  handleOnMyCourseLoading,
  handleOnRelatedCourseLoading,
  handleOnSaveTrackingLesson,
  handleOnSaveTrackingVideo,
  handleOnUpdateCompletedVideo,
  handleSaveNote,
  handleDeleteNote,
  handleSavePost,
  handleDeletePost,
  handleSaveReplyToPost,
  handleRemoveReplyInPost,
  handleSaveLikeOfPost,
  handleLoadNotification,
  handleReadNotification,
  handleReadAllNotification,
  handleUpdateUserRating,
  handleLoadCourseRating,
};
