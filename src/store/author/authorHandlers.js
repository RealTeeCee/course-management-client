import { call, put } from "redux-saga/effects";
import {
  requestLoadAuthor,
  requestLoadAuthorsPagination,
  requestLoadSubcribesByUserId,
  requestLoadTop3Authors,
  requestSubcribeAuthor,
} from "./authorRequests";
import {
  onLoadAuthorSuccess,
  onLoadAuthorsPaginationSuccess,
  onLoadSubcribesByUserIdSuccess,
  onLoadTop3AuthorsSuccess,
  onSubcribeAuthorSuccess,
  onUnsubcribeAuthorSuccess,
} from "./authorSlice";
import { toast } from "react-toastify";

function* handleOnLoadTop3Authors() {
  try {
    const res = yield call(requestLoadTop3Authors);

    if (res.status === 200) {
      yield put(onLoadTop3AuthorsSuccess(res.data));
    } else {
      // toast.error(MESSAGE_GENERAL_FAILED);
    }
  } catch (error) {
    console.log(error);
    // showMessageError(error);
  }
}
function* handleOnLoadAuthorsPagination({ payload }) {
  try {
    const res = yield call(requestLoadAuthorsPagination, payload);
    if (res.status === 200) {
      yield put(onLoadAuthorsPaginationSuccess(res.data));
    } else {
      // toast.error(MESSAGE_GENERAL_FAILED);
    }
  } catch (error) {
    console.log(error);
    // showMessageError(error);
  }
}

function* handleOnLoadSubcribesByUserId({ payload }) {
  try {
    const res = yield call(requestLoadSubcribesByUserId, payload);
    if (res.status === 200) {
      yield put(onLoadSubcribesByUserIdSuccess(res.data));
    } else {
      // toast.error(MESSAGE_GENERAL_FAILED);
    }
  } catch (error) {
    console.log(error);
    // showMessageError(error);
  }
}

function* handleOnSubcribeAuthor({ payload }) {
  try {
    const res = yield call(requestSubcribeAuthor, payload);
    if (res.status === 200) {
      toast.success("Thank for you subcribe.");
      yield put(onSubcribeAuthorSuccess());
    } else {
      // toast.error(MESSAGE_GENERAL_FAILED);
    }
  } catch (error) {
    console.log(error);
    // showMessageError(error);
  }
}

function* handleOnUnsubcribeAuthor({ payload }) {
  try {
    const res = yield call(requestSubcribeAuthor, payload);
    if (res.status === 200) {
      toast.success("Unsubcribe successfully.");
      yield put(onUnsubcribeAuthorSuccess());
    } else {
      // toast.error(MESSAGE_GENERAL_FAILED);
    }
  } catch (error) {
    console.log(error);
    // showMessageError(error);
  }
}
function* handleOnLoadAuthor({ payload }) {
  try {
    const res = yield call(requestLoadAuthor, payload);

    if (res.status === 200) {
      yield put(onLoadAuthorSuccess(res.data));
    } else {
      // toast.error(MESSAGE_GENERAL_FAILED);
    }
  } catch (error) {
    console.log(error);
    // showMessageError(error);
  }
}

export {
  handleOnLoadAuthorsPagination,
  handleOnLoadTop3Authors,
  handleOnLoadSubcribesByUserId,
  handleOnSubcribeAuthor,
  handleOnUnsubcribeAuthor,
  handleOnLoadAuthor,
};
