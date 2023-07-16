import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "adminBlog",
  initialState: {
    adminBlogs: [], // adminBlogs used for admin
    blogs: [], // blogs used for client
    isLoading: false,
    isPostBlogSuccess: false,
    isBulkDeleteSuccess: false,
  },
  reducers: {
    onLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    // adminBlogs used for admin
    onGetBlogsForAdmin: (state, action) => ({
      ...state,
      isLoading: true,
      isPostBlogSuccess: false,
    }),
    onGetBlogsForAdminSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      isBulkDeleteSuccess: false,
      adminBlogs: action.payload,
    }),
    // blogs used for client
    onGetBlogs: (state, action) => ({
      ...state,
      isLoading: true,
      isPostBlogSuccess: false,
    }),
    onGetBlogsSuccess: (state, action) => ({
      ...state,
      blogs: action.payload,
      isLoading: false,
    }),
    onPostBlog: (state, action) => ({
      ...state,
      isLoading: true,
      isPostBlogSuccess: false,
    }),
    onPostBlogSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      isPostBlogSuccess: action.payload,
    }),
    onDeleteBlog: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    onBulkDeleteBlog: (state, action) => ({
      ...state,
      isLoading: true,
      isBulkDeleteSuccess: false,
    }),
    onBulkDeleteBlogSuccess: (state, action) => ({
      ...state,
      isBulkDeleteSuccess: action.payload,
    }),
  },
});

export const {
  onLoading,
  onGetBlogsForAdmin,
  onGetBlogsForAdminSuccess,
  onGetBlogs,
  onGetBlogsSuccess,
  onGetBlogsById,
  onPostBlog,
  onPostBlogSuccess,
  onDeleteBlog,
  onBulkDeleteBlog,
  onBulkDeleteBlogSuccess,
} = blogSlice.actions;
// reducer
export default blogSlice.reducer;
