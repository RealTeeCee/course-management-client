import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { MESSAGE_GENERAL_FAILED } from "../../constants/config";
import { removeToken, setToken } from "../../utils/auth";
import {
  requestGetUser,
  requestLogin,
  requestRefreshToken,
  requestRegister,
} from "./authRequests";
import { onLoading, onLoginSuccess, onUpdateUserToken } from "./authSlice";

/**
 * *** Handler ***
 */
function* handleOnRegister(action) {
  try {
    const res = yield call(requestRegister, action.payload);
    if (res.data.type === "success") {
      toast.success(res.data.message);
    } else if (res.data.type === "warning") {
      toast.warning(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error(MESSAGE_GENERAL_FAILED);
    }
  }
}

function* handleOnLogin(action) {
  try {
    yield put(onLoading(true));
    const res = yield call(requestLogin, action.payload);
    if (res.data.type === "success") {
      yield put(onLoginSuccess(true));
      if (res.data.access_token && res.data.refresh_token) {
        setToken(res.data.access_token, res.data.refresh_token);
        yield call(handleOnGetUser, { token: res.data.access_token });
      }
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error(MESSAGE_GENERAL_FAILED);
    }
  } finally {
    yield put(onLoading(false));
  }
}

function* handleOnGetUser({ token }) {
  try {
    const res = yield call(requestGetUser, token);
    if (res.data.type === "success") {
      yield put(
        onUpdateUserToken({
          user: res.data,
          access_token: token,
        })
      );
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(MESSAGE_GENERAL_FAILED);
  }
}

function* handleOnRefreshToken(action) {
  try {
    const res = yield call(requestRefreshToken, action.payload);
    if (res.data.type === "success") {
      setToken(res.data.access_token, res.data.refresh_token);
      yield call(handleOnGetUser, { token: res.data.access_token });
    } else {
      yield call(handleOnRemoveToken());
    }
  } catch (error) {
    toast.error(MESSAGE_GENERAL_FAILED);
  }
  yield 1;
}

function* handleOnRemoveToken() {
  yield put(
    onUpdateUserToken({
      user: undefined,
      access_token: null,
    })
  );
  removeToken();
}

export {
  handleOnRegister,
  handleOnLogin,
  handleOnGetUser,
  handleOnRefreshToken,
  handleOnRemoveToken,
};