import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { MESSAGE_GENERAL_FAILED } from "../../../constants/config";
import { showMessageError } from "../../../utils/helper";
import {
  requestDeleteBlog,
  requestGetBlogs,
  requestGetBlogsForAdmin,
  requestPostBlog,
} from "./blogRequests";
import {
  onBulkDeleteBlogSuccess,
  onGetBlogsForAdmin,
  onGetBlogsForAdminSuccess,
  onGetBlogsSuccess,
  onLoading,
  onPostBlogSuccess,
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

function* handleOnDeleteBlog({ payload }) {
  try {
    const res = yield call(requestDeleteBlog, payload);
    if (res.data.type === "success") {
      yield put(onGetBlogsForAdmin());
      toast.success(res.data.message);
    } else {
      yield put(onLoading(false));
      showMessageError(MESSAGE_GENERAL_FAILED);
    }
  } catch (error) {
    yield put(onLoading(false));
    showMessageError(error);
  }
}

function* handleOnBulkDeleteBlog({ payload }) {
  try {
    for (const item of payload) {
      yield call(requestDeleteBlog, item.id);
    }

    yield put(onBulkDeleteBlogSuccess(true));
    toast.success(
      `Delete [${payload.length}] ${
        payload.length > 1 ? "blogs" : "blog"
      } success`
    );
  } catch (error) {
    showMessageError(error);
  } finally {
    yield put(onGetBlogsForAdmin());
  }
}

export {
  handleOnGetBlogsForAdmin,
  handleOnGetBlogs,
  handleOnPostBlog,
  handleOnDeleteBlog,
  handleOnBulkDeleteBlog,
};
