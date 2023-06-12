const { createSlice } = require("@reduxjs/toolkit");

/**
 * *Slice*
 */
const initialState = {
  isLoading: false,
  isLoadLearningStatus: false,
  isSelectLessonManual: false,

  data: [], //onCourseLoading() - HomePage.js, CoursePage.js
  freeCourse: [],
  bestSellerCourse: [],
  relatedCourse: [],
  errorMessage: null,
  courseId: 0, //onSelectedCourse(slug) - LearnPage.js -> filter data => data.slug === slug
  enrollId: 0, //onGetEnrollId(courseId, userId) - LearnPage.js
  sectionId: 0, //onSelectedLesson(sectionId, lessonId) - CollapseAntCom.js -> sectionId: action.payload.sectionId,
  lessonId: 0, //onSelectedLesson(sectionId, lessonId) - CollapseAntCom.js -> lessionId: action.payload.lessonId,
  resumePoint: 0, //onSelectedLesson(sectionId, lessonId) - CollapseAntCom.js -> lessionId: action.payload.lessonId,
  //onGetLearning(courseId) - LearnSidebarMod.js
  learning: {
    sectionDto: [], //All section of giving course
    lessonDto: [], //All lesson of giving course
    videoDto: [], //All video of giving course
  },

  video: {}, //onSelectedLesson(sectionId, lessonId) - CollapseAntCom.js -> filter learning.videoDto => videoDto.lessonId === lessonId
  tracking: null, // onGetTrackingLesson(enrollId, courseId) - courseHandlers.js -> select where tracked = TRUE
  progress: 0, //onLoadProgress(enrollId, courseId) - CollapseAntCom.js -> update where completed = TRUE

  //nguyen add
  isSaved: false,
};
const courseSlice = createSlice({
  name: "course",
  initialState: { ...initialState },
  reducers: {
    onCourseInitalState: (state, action) => ({
      ...initialState,
    }),
    onMyCourseLoading: (state, action) => ({
      ...state,
      isLoading: true,
      errorMessage: null,
    }),
    onMyCourseSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),

    onMyCourseFailed: (state, action) => ({
      ...state,
      isLoading: false,
      errorMessage: action.payload,
    }),
    onCourseLoading: (state, action) => ({
      ...state,
      isLoading: true,
      errorMessage: null,
    }),
    onCourseSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    onCourseFailed: (state, action) => ({
      ...state,
      isLoading: false,
      errorMessage: action.payload,
    }),
    onFreeCourseLoading: (state, action) => ({
      ...state,
      isLoading: true,
      errorMessage: null,
    }),
    onFreeCourseSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      freeCourse: action.payload,
    }),

    onBestSellerCourseLoading: (state, action) => ({
      ...state,
      isLoading: true,
      errorMessage: null,
    }),
    onBestSellerCourseSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      bestSellerCourse: action.payload,
    }),

    onRelatedCourseLoading: (state, action) => ({
      ...state,
      isLoading: true,
      errorMessage: null,
    }),
    onRelatedCourseSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      relatedCourse: action.payload,
    }),

    onSelectedCourse: (state, action) => {
      const filteredCourse = state.data.filter(
        (course) => course.slug === action.payload
      );

      if (filteredCourse.length > 0) {
        return {
          ...state,
          courseId: filteredCourse[0].id,
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
          lessonId: action.payload.lessonId,
        };
      }
      return {
        ...state,
        sectionId: action.payload.sectionId,
        lessonId: action.payload.lessonId,
      };
    },
    onManualSelectedLesson: (state, action) => {
      const filteredVideo = state.learning.videoDto.filter(
        (video) => video.lessonId === action.payload.lessonId
      );

      if (filteredVideo.length > 0) {
        return {
          ...state,
          sectionId: action.payload.sectionId,
          video: filteredVideo[0],
          lessonId: action.payload.lessonId,
          isSelectLessonManual: true,
        };
      }
      return {
        ...state,
        sectionId: action.payload.sectionId,
        lessonId: action.payload.lessonId,
        isSelectLessonManual: true,
      };
    },
    onManualSelectedLessonSuccess: (state, action) => ({
      ...state,
      resumePoint: action.payload,
    }),
    onGetEnrollId: (state, action) => ({
      ...state,
      isLoading: true,
      //nguyen add
      isSaved: false,
      errorMessage: null,
    }),
    onGetEnrollIdSuccess: (state, action) => ({
      ...state,
      enrollId: action.payload,
    }),
    onGetLearning: (state, action) => ({
      ...state,
      isLoading: true,
      //nguyen add
      isSaved: false,
      errorMessage: null,
      isLoadLearningStatus: false,
    }),
    onGetLearningSuccess: (state, action) => ({
      ...state,
      learning: action.payload,
      isLoadLearningStatus: true,
    }),
    onGetTrackingLesson: (state, action) => ({
      ...state,
      isLoading: true,
      errorMessage: null,
    }),
    onGetTrackingLessonSuccess: (state, action) => ({
      ...state,
      tracking: action.payload,
    }),
    onSaveTrackingLesson: (state, action) => ({
      ...state,
      isLoading: true,
      errorMessage: null,
      lessonId: action.payload.lessonId,
    }),
    onSaveTrackingLessonSuccess: (state, action) => ({
      ...state,
      isSaved: true,
    }),
    onSaveTrackingVideo: (state, action) => ({
      ...state,
      isLoading: true,
      //nguyen add
      isSaved: false,
      errorMessage: null,
      lessonId: action.payload.lessonId,
    }),
    onSaveTrackingVideoSuccess: (state, action) => ({
      ...state,
    }),
    onUpdateCompletedVideo: (state, action) => ({
      ...state,
      isLoading: true,
      //nguyen add
      isSaved: false,
      errorMessage: null,
    }),
    onUpdateCompletedVideoSuccess: (state, action) => ({
      ...state,
      progress: action.payload,
    }),
    onLoadProgress: (state, action) => ({
      ...state,
      isLoading: true,
      //nguyen add
      isSaved: false,
      errorMessage: null,
    }),
    onLoadProgressSuccess: (state, action) => ({
      ...state,
      progress: action.payload,
    }),
  },
});

export const {
  onCourseInitalState,
  onMyCourseLoading,
  onMyCourseSuccess,
  onMyCourseFailed,
  onCourseLoading,
  onCourseSuccess,
  onCourseFailed,
  onFreeCourseLoading,
  onFreeCourseSuccess,
  onBestSellerCourseLoading,
  onBestSellerCourseSuccess,
  onRelatedCourseLoading,
  onRelatedCourseSuccess,
  onSelectedCourse,
  onSelectedLesson,
  onManualSelectedLesson,
  onManualSelectedLessonSuccess,
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
