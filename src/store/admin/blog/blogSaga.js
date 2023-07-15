import { takeLatest } from "redux-saga/effects";
import {
  handleOnGetBlogsForAdmin,
  handleOnUpdateBlog,
  handleOnGetBlogs,
  handleOnPostBlog,
} from "./blogHandlers";
import {
  onGetBlogs,
  onGetBlogsForAdmin,
  onPostBlog,
  onUpdateBlog,
} from "./blogSlice";

export default function* adminBlogSaga() {
  yield takeLatest(onGetBlogsForAdmin.type, handleOnGetBlogsForAdmin);
  yield takeLatest(onGetBlogs.type, handleOnGetBlogs);
  yield takeLatest(onPostBlog.type, handleOnPostBlog);
  // yield takeLatest(onUpdateBlog.type, handleOnUpdateBlog);
}
