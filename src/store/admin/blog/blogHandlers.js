import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { showMessageError } from "../../../utils/helper";
import {
  requestGetBlogs,
  requestGetBlogsForAdmin,
  requestPostBlog,
  requestUpdateBlog,
} from "./blogRequests";
import {
  onGetBlogsForAdminSuccess,
  onGetBlogsSuccess,
  onLoading,
  onPostBlogSuccess,
  onUpdateBlogSuccess,
} from "./blogSlice";

function* handleOnGetBlogsForAdmin() {
  try {
    const res = yield call(requestGetBlogsForAdmin);
    if (res.status === 200) yield put(onGetBlogsForAdminSuccess(res.data));
  } catch (error) {
    console.log(error);
    yield put(onLoading(false));
  }
}

function* handleOnGetBlogs() {
  try {
    const res = yield call(requestGetBlogs);
    if (res.status === 200) yield put(onGetBlogsSuccess(res.data));
  } catch (error) {
    console.log(error);
    yield put(onLoading(false));
  }
}

function* handleOnPostBlog({ payload }) {
  console.log("handle:", payload);
  try {
    const res = yield call(requestPostBlog, payload);
    if (res.data.type === "success") {
      toast.success(res.data.message);
      yield put(onPostBlogSuccess(true));
    }
  } catch (error) {
    yield put(onLoading(false));
    showMessageError(error);
  }
}

// function* handleOnUpdateBlog({ payload }) {
//   try {
//     const res = yield call(requestUpdateBlog, payload);
//     if (res.data.type === "success") {
//       toast.success(res.data.message);
//       yield put(onUpdateBlogSuccess(true));
//     }
//   } catch (error) {
//     yield put(onLoading(false));
//     showMessageError(error);
//   }
// }

export {
  handleOnGetBlogsForAdmin,
  handleOnGetBlogs,
  handleOnPostBlog,
  // handleOnUpdateBlog,
};
