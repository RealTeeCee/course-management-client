import { createSelector } from "@reduxjs/toolkit";

const selectCourseReducer = (state) => state.course; //store in rootReducer

export const selectEnrollIdAndCourseId = createSelector(
  [selectCourseReducer],
  (courseSlice) => ({
    enrollId: courseSlice.enrollId,
    courseId: courseSlice.selectedCourse.id,
  })
);

// export const selectCourseIsSuccess = createSelector(
//   [selectCourseReducer],
//   (courseSlice) => courseSlice.isSuccess
// );

// export const selectCourseFailed = createSelector(
//   [selectCourseReducer],
//   (courseSlice) => courseSlice.error
// );
