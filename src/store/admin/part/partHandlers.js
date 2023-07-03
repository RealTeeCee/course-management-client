import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { MESSAGE_GENERAL_FAILED } from "../../../constants/config";
import { showMessageError } from "../../../utils/helper";
import { requestPostQuestion } from "../question/questionRequests";
import {
  requestPostPart,
  requestDeletePart,
  requestGetPartsByCourseId,
} from "./partRequests";
import {
  onBulkDeletePartSuccess,
  onPostPartSuccess,
  onGetPartsByCourseId,
  onGetPartsByCourseIdSuccess,
  onLoading,
} from "./partSlice";

function* handleOnGetPartsByCourseId({ payload }) {
  try {
    const res = yield call(requestGetPartsByCourseId, payload.courseId);
    if (res.status === 200) yield put(onGetPartsByCourseIdSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
}

function* handleOnPostPart({ payload }) {
  console.log("handle: ", payload);
  yield put(onLoading(false));
  try {
    if (payload.type === "resetPoint") {
      for (const item of payload.questionsByPartId) {
        const data = {
          ...item,
          point: 0.1,
        };
        console.log(data);
        try {
          yield call(requestPostQuestion, data);
        } catch (error) {
        }
      }
    } else {
      // const res = yield call(requestPostPart, payload);
      // if (res.data.type === "success") {
      //   toast.success(res.data.message);
      //   yield put(onPostPartSuccess(true));
      // }
    }
  } catch (error) {
    yield put(onLoading(false));
    showMessageError(error);
  }
}

function* handleOnDeletePart({ payload }) {
  try {
    const res = yield call(requestDeletePart, payload);
    if (res.data.type === "success") {
      yield put(
        onGetPartsByCourseId({
          courseId: payload.courseId,
        })
      );
      toast.success(res.data.message);
    } else {
      yield put(onLoading(false));
      showMessageError(MESSAGE_GENERAL_FAILED);
    }
  } catch (error) {
    yield put(onLoading(false));
    showMessageError(error);
  }
}

function* handleOnBulkDeletePart({ payload }) {
  try {
    for (const part of payload) {
      yield call(requestDeletePart, part);
    }

    yield put(onBulkDeletePartSuccess(true));
    toast.success(
      `Delete [${payload.length}] ${
        payload.length > 1 ? "parts" : "part"
      } success`
    );
  } catch (error) {
    showMessageError(error);
  } finally {
    yield put(
      onGetPartsByCourseId({
        courseId: payload[0].courseId,
      })
    );
  }
}

export {
  handleOnGetPartsByCourseId,
  handleOnPostPart,
  handleOnDeletePart,
  handleOnBulkDeletePart,
};
