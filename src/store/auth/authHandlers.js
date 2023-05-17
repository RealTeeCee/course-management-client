import { toast } from "react-toastify";
import { call } from "redux-saga/effects";
import {
  MESSAGE_LOGIN_FAILED,
  MESSAGE_LOGIN_SUCCESS,
  MESSAGE_REGISTER_FAILED,
  MESSAGE_REGISTER_SUCCESS,
} from "../../constants/config";
import { saveToken } from "../../utils/auth";
import { requestLogin, requestRegister } from "./authRequests";

/**
 * *** Handler ***
 */
function* handleOnRegister(action) {
  // Call Api
  try {
    const res = yield call(requestRegister, action.payload);
    if (res.status === 200) {
      toast.success(MESSAGE_REGISTER_SUCCESS);
    }
  } catch (error) {
    toast.error(MESSAGE_REGISTER_FAILED);
  }
}

function* handleOnLogin(action) {
  console.log("handle: ", action);
  // Call Api
  try {
    const res = yield call(requestLogin, action.payload);
    if (res.status === 200) {
      toast.success(MESSAGE_LOGIN_SUCCESS);

      if (res.data.access_token && res.data.refresh_token) {
        saveToken(res.data.access_token, res.data.refresh_token);
      }
    }
  } catch (error) {
    toast.error(MESSAGE_LOGIN_FAILED);
  }
  yield 1;
}

export { handleOnRegister, handleOnLogin };
