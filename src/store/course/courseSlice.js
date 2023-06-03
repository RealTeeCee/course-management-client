const { createSlice } = require("@reduxjs/toolkit");

/**
 * *Slice*
 */
const initialState = {
  isLoading: false,
  isSuccess: false,
  data: [],
  errorMessage: null,
  selectedCourse: null,
  video: {},
  enrollId: 0,
  sectionId: 0,
  learning: {
    sectionDto: [],
    lessonDto: [],
    videoDto: [],
  },
  tracking: null,
  progress: 0,
};
const courseSlice = createSlice({
  name: "course",
  initialState: { ...initialState },
  reducers: {
    onMyCourseLoading: (state, action) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: null,
    }),
    onMyCourseSuccess: (state, action) => ({
      ...state,
      isSuccess: true,
      isLoading: false,
      data: action.payload,
    }),

    onMyCourseFailed: (state, action) => ({
      ...state,
      isSuccess: false,
      isLoading: false,
      errorMessage: action.payload,
    }),
    onCourseLoading: (state, action) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: null,
    }),
    onCourseSuccess: (state, action) => ({
      ...state,
      isSuccess: true,
      isLoading: false,
      data: action.payload,
    }),

    onCourseFailed: (state, action) => ({
      ...state,
      isSuccess: false,
      isLoading: false,
      errorMessage: action.payload,
    }),
    onSelectedCourse: (state, action) => {
      const filteredCourse = state.data.filter(
        (course) => course.slug === action.payload
      );

      if (filteredCourse.length > 0) {
        return {
          ...state,
          selectedCourse: filteredCourse[0],
        };
      }
      return {
        ...state,
      };
    },
    onSelectedLesson: (state, action) => {
      console.log(action.payload);
      const filteredVideo = state.learning.videoDto.filter(
        (video) => video.lessonId === action.payload.lessonId
      );

      if (filteredVideo.length > 0) {
        return {
          ...state,
          sectionId: action.payload.sectionId,
          video: filteredVideo[0],
        };
      }
      return {
        ...state,
        sectionId: action.payload.sectionId,
      };
    },
    onGetEnrollId: (state, action) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: null,
    }),
    onGetEnrollIdSuccess: (state, action) => ({
      ...state,
      enrollId: action.payload,
      isSuccess: true,
    }),
    onGetLearning: (state, action) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: null,
    }),
    onGetLearningSuccess: (state, action) => ({
      ...state,
      learning: action.payload,
      isSuccess: true,
    }),
    onGetTrackingLesson: (state, action) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: null,
    }),
    onGetTrackingLessonSuccess: (state, action) => ({
      ...state,
      tracking: action.payload,
      isSuccess: true,
    }),
    onSaveTrackingLesson: (state, action) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: null,
    }),
    onSaveTrackingLessonSuccess: (state, action) => ({
      ...state,
      isSuccess: true,
    }),
    onSaveTrackingVideo: (state, action) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: null,
    }),
    onSaveTrackingVideoSuccess: (state, action) => ({
      ...state,
      isSuccess: true,
    }),
    onUpdateCompletedVideo: (state, action) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: null,
    }),
    onUpdateCompletedVideoSuccess: (state, action) => ({
      ...state,
      isSuccess: true,
      progress: action.payload,
    }),
    onLoadProgress: (state, action) => ({
      ...state,
      isLoading: true,
      isSuccess: false,
      errorMessage: null,
    }),
    onLoadProgressSuccess: (state, action) => ({
      ...state,
      isSuccess: true,
      progress: action.payload,
    }),
  },
});

export const {
  onMyCourseLoading,
  onMyCourseSuccess,
  onMyCourseFailed,
  onCourseLoading,
  onCourseSuccess,
  onCourseFailed,
  onSelectedCourse,
  onSelectedLesson,
  onGetEnrollId,
  onGetEnrollIdSuccess,
  onGetLearning,
  onGetLearningSuccess,
  onGetTrackingLesson,
  onSaveTrackingLesson,
  onGetTrackingLessonSuccess,
  onSaveTrackingLessonSuccess,
  onSaveTrackingVideo,
  onSaveTrackingVideoSuccess,
  onUpdateCompletedVideo,
  onUpdateCompletedVideoSuccess,
  onLoadProgress,
  onLoadProgressSuccess,
} = courseSlice.actions;
// courseReducer
export default courseSlice.reducer;
