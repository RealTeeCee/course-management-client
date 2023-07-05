import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { showMessageError } from "../../../utils/helper";
import {
  requestGetUserRegisteredToday,
  requestGetUsers,
  requestUpdateUser,
} from "./userRequests";
import {
  onGetUsersRegisteredTodaySuccess,
  onGetUsersSuccess,
  onLoading,
  onUpdateUserSuccess,
} from "./userSlice";

function* handleOnGetUsers() {
  try {
    const res = yield call(requestGetUsers);
    if (res.status === 200) yield put(onGetUsersSuccess(res.data));
  } catch (error) {
    yield put(onLoading(false));
    console.log(error);
  }
}
function* handleOnGetUsersRegisteredToday() {
  try {
    const res = yield call(requestGetUserRegisteredToday);
    if (res.status === 200)
      yield put(onGetUsersRegisteredTodaySuccess(res.data));
  } catch (error) {
    yield put(onLoading(false));
    console.log(error);
  }
}

function* handleOnUpdateUser({ payload }) {
  try {
    const res = yield call(requestUpdateUser, payload);
    if (res.data.type === "success") {
      toast.success(res.data.message);
      yield put(onUpdateUserSuccess(true));
    }
  } catch (error) {
    yield put(onLoading(false));
    showMessageError(error);
  }
}

export {
  handleOnGetUsers,
  handleOnGetUsersRegisteredToday,
  handleOnUpdateUser,
};
