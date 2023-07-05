import { takeLatest } from "redux-saga/effects";
import {
  handleOnGetUsers,
  handleOnGetUsersRegisteredToday,
  handleOnUpdateUser,
} from "./userHandlers";
import {
  onGetUsers,
  onGetUsersRegisteredToday,
  onUpdateUser,
} from "./userSlice";

export default function* userSaga() {
  yield takeLatest(onGetUsers.type, handleOnGetUsers);
  yield takeLatest(
    onGetUsersRegisteredToday.type,
    handleOnGetUsersRegisteredToday
  );
  yield takeLatest(onUpdateUser.type, handleOnUpdateUser);
}
