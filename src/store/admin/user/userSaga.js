import { takeLatest } from "redux-saga/effects";
import { handleOnGetUsers, handleOnUpdateUser } from "./userHandlers";
import { onGetUsers, onUpdateUser } from "./userSlice";

export default function* userSaga() {
  yield takeLatest(onGetUsers.type, handleOnGetUsers);
  yield takeLatest(onUpdateUser.type, handleOnUpdateUser);
}
