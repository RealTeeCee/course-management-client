import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "adminBlog",
  initialState: {
    adminBlogs: [], // adminBlogs used for admin
    blogs: [], // blogs used for client
    isLoading: false,
    isPostBlogSuccess: false,
    // isUpdateBlogSuccess: false,
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
      adminBlogs: action.payload,
      isLoading: false,
    }),
    // blogs used for client
    onGetBlogs: (state, action) => ({
      ...state,
      isLoading: true,
      isPostBlogSuccess: false,
    }),
    onGetBlogById: (state, action) => ({
      ...state,
      isLoading: true,
      // isPostBlogSuccess: false,
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
    // onUpdateBlog: (state, action) => ({
    //   ...state,
    //   isLoading: true,
    //   isUpdateBlogSuccess: false,
    // }),
    // onUpdateBlogSuccess: (state, action) => ({
    //   ...state,
    //   isUpdateBlogSuccess: action.payload,
    // }),
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
  // onUpdateBlog,
  // onUpdateBlogSuccess,
} = blogSlice.actions;
// reducer
export default blogSlice.reducer;
