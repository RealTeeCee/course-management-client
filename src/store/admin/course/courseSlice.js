import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "adminCourse",
  initialState: {
    courses: [],
    isLoading: false,
    isUpdateCourseSuccess: false,
  },
  reducers: {
    onGetCourses: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    onGetCoursesSuccess: (state, action) => ({
      ...state,
      courses: action.payload,
      isLoading: false,
    }),
    onUpdateCourse: (state, action) => ({
      ...state,
      isLoading: true,
      isUpdateCourseSuccess: false,
    }),
    onUpdateCourseSuccess: (state, action) => ({
      ...state,
      isUpdateCourseSuccess: action.payload,
    }),
  },
});

export const {
  onGetCourses,
  onGetCoursesSuccess,
  onUpdateCourse,
  onUpdateCourseSuccess,
} = courseSlice.actions;
// reducer
export default courseSlice.reducer;
