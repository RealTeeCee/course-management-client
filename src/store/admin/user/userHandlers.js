import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { showMessageError } from "../../../utils/helper";
import {
  requestCreateUser,
  requestGetAllUsers,
  requestGetUsers,
  requestUpdateUser,
} from "./userRequests";
import { onPostUserSuccess, onLoading, onGetUsersSuccess } from "./userSlice";

function* handleOnGetUsers() {
  try {
    const res = yield call(requestGetUsers);
    if (res.status === 200) yield put(onGetUsersSuccess(res.data));
  } catch (error) {
    yield put(onLoading(false));
    console.log(error);
  }
}

function* handleOnGetAllUsers() {
  try {
    const res = yield call(requestGetAllUsers);
    if (res.status === 200) yield put(onGetUsersSuccess(res.data));
  } catch (error) {
    yield put(onLoading(false));
    console.log(error);
  }
}

function* handleOnCreateUser({ payload }) {
  try {
    const res = yield call(requestCreateUser, payload);
    console.log("res:", res);
    if (res.data.type === "success") {
      toast.success("Create new user success !");
      yield put(onPostUserSuccess(true));
    }
  } catch (error) {
    yield put(onLoading(false));
    showMessageError(error);
  }
}

function* handleOnUpdateUser({ payload }) {
  try {
    const res = yield call(requestUpdateUser, payload);
    if (res.data.type === "success") {
      toast.success(res.data.message);
      yield put(onPostUserSuccess(true));
    }
  } catch (error) {
    yield put(onLoading(false));
    showMessageError(error);
  }
}

export {
  handleOnGetUsers,
  handleOnGetAllUsers,
  handleOnCreateUser,
  handleOnUpdateUser,
};
