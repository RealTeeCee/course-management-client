import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { MESSAGE_GENERAL_FAILED } from "../../../constants/config";
import { showMessageError } from "../../../utils/helper";
import {
  requestDeleteQuestion,
  requestGetQuestionsByCourseId,
  requestPostQuestion,
} from "./questionRequests";
import {
  onBulkDeleteQuestionSuccess,
  onPostQuestionSuccess,
  onGetQuestionsByPartId,
  onGetQuestionsByPartIdSuccess,
  onLoading,
} from "./questionSlice";

function* handleOnGetQuestionsByCourseId({ payload }) {
  try {
    const res = yield call(requestGetQuestionsByCourseId, payload.partId);
    if (res.status === 200) yield put(onGetQuestionsByPartIdSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
}

function* handleOnPostQuestion({ payload }) {
  try {
    const res = yield call(requestPostQuestion, payload);
    if (res.data.type === "success") {
      toast.success(res.data.message);
      yield put(onPostQuestionSuccess(true));
    }
  } catch (error) {
    yield put(onLoading(false));
    showMessageError(error);
  }
}

function* handleOnDeleteQuestion({ payload }) {
  try {
    const res = yield call(requestDeleteQuestion, payload);
    if (res.data.type === "success") {
      yield put(
        onGetQuestionsByPartId({
          partId: payload.partId,
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

function* handleOnBulkDeleteQuestion({ payload }) {
  try {
    for (const item of payload) {
      yield call(requestDeleteQuestion, item);
    }

    yield put(onBulkDeleteQuestionSuccess(true));
    toast.success(
      `Delete [${payload.length}] ${
        payload.length > 1 ? "parts" : "part"
      } success`
    );
  } catch (error) {
    showMessageError(error);
  } finally {
    yield put(
      onGetQuestionsByPartId({
        partId: payload[0].partId,
      })
    );
  }
}

export {
  handleOnGetQuestionsByCourseId,
  handleOnPostQuestion,
  handleOnDeleteQuestion,
  handleOnBulkDeleteQuestion,
};
