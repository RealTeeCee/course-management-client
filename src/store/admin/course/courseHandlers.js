import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { showMessageError } from "../../../utils/helper";
import { requestGetCourses, requestUpdateCourse } from "./courseRequests";
import { onGetCoursesSuccess, onUpdateCourseSuccess } from "./courseSlice";

function* handleOnGetCourses() {
  try {
    const res = yield call(requestGetCourses);
    if (res.status === 200) yield put(onGetCoursesSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
}

function* handleOnUpdateCourse({ payload }) {
  try {
    const res = yield call(requestUpdateCourse, payload);
    if (res.data.type === "success") {
      toast.success(res.data.message);
      yield put(onUpdateCourseSuccess(true));
    }
  } catch (error) {
    showMessageError(error);
  }
}

export { handleOnGetCourses, handleOnUpdateCourse };
