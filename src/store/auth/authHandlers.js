import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import {
  MESSAGE_LOGIN_FAILED,
  MESSAGE_LOGIN_SUCCESS,
  MESSAGE_REGISTER_FAILED,
  MESSAGE_REGISTER_SUCCESS,
  MESSAGE_UNAUTHORIZE,
} from "../../constants/config";
import { saveToken } from "../../utils/auth";
import { requestGetUser, requestLogin, requestRegister } from "./authRequests";
import { onUpdateUser } from "./authSlice";

/**
 * *** Handler ***
 */
function* handleOnRegister(action) {
  // Call Api
  try {
    const res = yield call(requestRegister, action.payload);
    if (res.data.type === "success") {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(MESSAGE_REGISTER_FAILED);
  }
}

function* handleOnLogin(action) {
  // Call Api
  try {
    const res = yield call(requestLogin, action.payload);
    if (res.data.type === "success") {
      toast.success(res.data.message);

      if (res.data.access_token && res.data.refresh_token) {
        saveToken(res.data.access_token, res.data.refresh_token);
        yield call(handleGetUser, { token: res.data.access_token });
      }
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(MESSAGE_LOGIN_FAILED);
  }
  yield 1;
}

function* handleGetUser({ token }) {
  console.log("handle GetUser: ", token);
  try {
    const res = yield call(requestGetUser, token);
    if (res.data.type === "success") {
      yield put(
        onUpdateUser({
          user: res.data,
          access_token: token,
        })
      );
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(MESSAGE_UNAUTHORIZE);
  }
}

export { handleOnRegister, handleOnLogin, handleGetUser };
