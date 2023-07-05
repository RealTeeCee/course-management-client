import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { showMessageError } from "../../utils/helper";
import { requestGetUsers, requestUpdateUser } from "./userRequests";
import { onGetUsersSuccess, onUpdateUserSuccess } from "./userSlice";

function* handleOnGetUsers() {
  try {
    const res = yield call(requestGetUsers);
    if (res.status === 200) yield put(onGetUsersSuccess(res.data));
  } catch (error) {
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
    showMessageError(error);
  }
}

export { handleOnGetUsers, handleOnUpdateUser };
