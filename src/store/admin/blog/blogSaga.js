import { takeLatest } from "redux-saga/effects";
import {
  handleOnBulkDeleteBlog,
  handleOnDeleteBlog,
  handleOnGetBlogs,
  handleOnGetBlogsForAdmin,
  handleOnPostBlog,
} from "./blogHandlers";
import {
  onBulkDeleteBlog,
  onDeleteBlog,
  onGetBlogs,
  onGetBlogsForAdmin,
  onPostBlog,
} from "./blogSlice";

export default function* adminBlogSaga() {
  yield takeLatest(onGetBlogsForAdmin.type, handleOnGetBlogsForAdmin);
  yield takeLatest(onGetBlogs.type, handleOnGetBlogs);
  yield takeLatest(onPostBlog.type, handleOnPostBlog);
  yield takeLatest(onDeleteBlog.type, handleOnDeleteBlog);
  yield takeLatest(onBulkDeleteBlog.type, handleOnBulkDeleteBlog);
}
