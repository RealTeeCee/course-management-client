import { createSelector } from "@reduxjs/toolkit";

const selectCourseReducer = (state) => state.course; //store in rootReducer

export const selectAllCourseState = createSelector(
  [selectCourseReducer],
  (courseSlice) => ({
    data: courseSlice.data,
    courseId: courseSlice.selectedCourse?.id,
    lessonId: courseSlice.lessonId,
    enrollId: courseSlice.enrollId,
    learning: courseSlice.learning,
    video: courseSlice.video,
    sectionId: courseSlice.sectionId,
    tracking: courseSlice.tracking,
    progress: courseSlice.progress,
    //nguyen add
    isSaved: courseSlice.isSaved,
  })
);

export const selectEnrollIdAndCourseId = createSelector(
  [selectCourseReducer],
  (courseSlice) => ({
    enrollId: courseSlice.enrollId,
    courseId: courseSlice.selectedCourse.id,
  })
);

export const selectVideo = createSelector(
  [selectCourseReducer],
  (courseSlice) => courseSlice.video
);

export const selectSectionId = createSelector(
  [selectCourseReducer],
  (courseSlice) => courseSlice.sectionId
);

export const selectLearningAndTracking = createSelector(
  [selectCourseReducer],
  (courseSlice) => ({
    learning: courseSlice.learning,
    tracking: courseSlice.tracking,
  })
);

export const selectLearning = createSelector(
  [selectCourseReducer],
  (courseSlice) => courseSlice.learning
);

export const selectTracking = createSelector(
  [selectCourseReducer],
  (courseSlice) => courseSlice.tracking
);

export const selectProgress = createSelector(
  [selectCourseReducer],
  (courseSlice) => courseSlice.progress
);

// export const selectCourseFailed = createSelector(
//   [selectCourseReducer],
//   (courseSlice) => courseSlice.error
// );
