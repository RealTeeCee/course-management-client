import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../api/axiosInstance";
import { LOGIN_TYPE } from "./type";
import { LOGIN_URL } from "../../api/url";
import { loginFailed, loginOAuthFailed, loginSuccess } from "./action";
import { getCurrentUser } from "../user/action";

const login = async (data) => {
  const resp = await axiosInstance({
    method: "POST",
    url: LOGIN_URL,
    data,
  });
  return resp;
};

function* loginAsync({ payload }) {
  try {
    yield delay(200);
    const resp = yield call(login, payload);
    const { access_token, refresh_token } = resp.data;
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);
    yield put(loginSuccess(resp.data));
    yield put(getCurrentUser());
  } catch (error) {
    yield put(loginFailed(error));
  }
}

export function* handleLogin() {
  yield takeLatest(LOGIN_TYPE.LOGIN_START, loginAsync);
}

export function* loginSaga() {
  yield all([call(handleLogin)]);
}
