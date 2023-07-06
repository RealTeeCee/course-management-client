import { takeLatest } from "redux-saga/effects";
import {
  handleOnCreateUser,
  handleOnGetAllUsers,
  handleOnGetUsers,
  handleOnUpdateUser,
} from "./userHandlers";
import {
  onCreateUser,
  onGetAllUsers,
  onGetUsers,
  onUpdateUser,
} from "./userSlice";

export default function* userSaga() {
  yield takeLatest(onGetUsers.type, handleOnGetUsers);
  yield takeLatest(onGetAllUsers.type, handleOnGetAllUsers);
  yield takeLatest(onCreateUser.type, handleOnCreateUser);
  yield takeLatest(onUpdateUser.type, handleOnUpdateUser);
}
