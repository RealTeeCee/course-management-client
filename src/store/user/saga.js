import axiosInstance from "../../api/axiosInstance";
import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import { CURRENT_USER_URL } from "../../api/url";
import { getCurrentUserFailed, getCurrentUserSuccess } from "./action";
import { USER_TYPE } from "./type";

const getCurrentUser = async () => {
  const resp = await axiosInstance.get(CURRENT_USER_URL);
  return resp;
};

function* getCurrentUserAsync() {
  try {
    yield delay(200);
    const resp = yield call(getCurrentUser);
    yield put(getCurrentUserSuccess(resp.data));
  } catch (error) {
    yield put(getCurrentUserFailed(error));
  }
}

export function* handleGetCurrentUser() {
  yield takeLatest(USER_TYPE.GET_CURRENT_USER, getCurrentUserAsync);
}

export function* userSaga() {
  yield all([call(handleGetCurrentUser)]);
}
