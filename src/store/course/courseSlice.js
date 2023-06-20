import { addNewNotes, deleteNotes } from "./courseHelper";

const { createSlice } = require("@reduxjs/toolkit");

/**
 * *Slice*
 */
const initialState = {
  isLoading: false,
  isLoadLearningStatus: false,
  isSelectLessonManual: false,
  isReload: false,
  isReady: false,

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

  video: null, //onSelectedLesson(sectionId, lessonId) - CollapseAntCom.js -> filter learning.videoDto => videoDto.lessonId === lessonId
  tracking: null, // onGetTrackingLesson(enrollId, courseId) - courseHandlers.js -> select where tracked = TRUE
  progress: 0, //onLoadProgress(enrollId, courseId) - CollapseAntCom.js -> update where completed = TRUE

  notes: [], //onGetNote
};
const courseSlice = createSlice({
  name: "course",
  initialState: { ...initialState },
  reducers: {
    onCourseInitalState: (state, action) => ({
      ...initialState,
    }),
    onReload: (state, action) => {
      return {
        ...state,
        errorMessage: null,
        isReload: action.payload,
        isLoadLearningStatus: false,
      };
    },
    onMyCourseLoading: (state, action) => ({
      ...state,
      errorMessage: null,
    }),
    onMyCourseSuccess: (state, action) => ({
      ...state,
      data: action.payload,
      isReady: false,
    }),
    onMyCourseFailed: (state, action) => ({
      ...state,
      errorMessage: action.payload,
    }),
    onCourseLoading: (state, action) => ({
      ...state,
      errorMessage: null,
    }),
    onCourseSuccess: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    onCourseFailed: (state, action) => ({
      ...state,
      errorMessage: action.payload,
    }),
    onFreeCourseLoading: (state, action) => ({
      ...state,
      errorMessage: null,
    }),
    onFreeCourseSuccess: (state, action) => ({
      ...state,
      freeCourse: action.payload,
    }),

    onBestSellerCourseLoading: (state, action) => ({
      ...state,
      errorMessage: null,
    }),
    onBestSellerCourseSuccess: (state, action) => ({
      ...state,
      bestSellerCourse: action.payload,
    }),

    onRelatedCourseLoading: (state, action) => ({
      ...state,
      errorMessage: null,
    }),
    onRelatedCourseSuccess: (state, action) => ({
      ...state,
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
          isSelectLessonManual: false,
          isReady: false,
        };
      }
      return {
        ...state,
        sectionId: action.payload.sectionId,
        lessonId: action.payload.lessonId,
        isSelectLessonManual: false,
        isReady: false,
      };
    },
    onManualSelectedLessonSuccess: (state, action) => ({
      ...state,
      resumePoint: action.payload.resumePoint,
      tracking: action.payload,
      isReady: true,
      isReload: true,
      isSelectLessonManual: true,
    }),
    onGetEnrollId: (state, action) => ({
      ...state,
      errorMessage: null,
    }),
    onGetEnrollIdSuccess: (state, action) => ({
      ...state,
      enrollId: action.payload,
    }),
    onGetLearning: (state, action) => ({
      ...state,
      errorMessage: null,
      isLoadLearningStatus: false,
      isLoading: true,
    }),
    onGetLearningSuccess: (state, action) => ({
      ...state,
      learning: action.payload,
      isLoadLearningStatus: true,
      isLoading: false,
    }),
    onGetTrackingLesson: (state, action) => ({
      ...state,
      errorMessage: null,
    }),
    onGetTrackingLessonSuccess: (state, action) => ({
      ...state,
      tracking: action.payload,
      resumePoint: action.payload ? action.payload.resumePoint : 0,
    }),
    onSaveTrackingLesson: (state, action) => ({
      ...state,
      errorMessage: null,
    }),
    onSaveTrackingLessonSuccess: (state, action) => ({
      ...state,
      tracking: action.payload,
    }),
    onSaveTrackingVideo: (state, action) => ({
      ...state,
      errorMessage: null,
      lessonId: action.payload.lessonId,
    }),
    onSaveTrackingVideoSuccess: (state, action) => ({
      ...state,
    }),
    onUpdateCompletedVideo: (state, action) => ({
      ...state,
      errorMessage: null,
    }),
    onUpdateCompletedVideoSuccess: (state, action) => ({
      ...state,
      progress: action.payload,
    }),
    onLoadProgress: (state, action) => ({
      ...state,
      errorMessage: null,
    }),
    onLoadProgressSuccess: (state, action) => ({
      ...state,
      progress: action.payload,
    }),
    onReady: (state, action) => ({
      ...state,
      isReady: action.payload,
    }),
    onLoadNote: (state, action) => ({
      ...state,
    }),
    onLoadNoteSuccess: (state, action) => ({
      ...state,
      notes: action.payload,
    }),
    onSaveNote: (state, action) => ({
      ...state,
    }),
    onSaveNoteSuccess: (state, action) => {
      return {
        ...state,
        notes: addNewNotes(state.notes, action.payload),
      };
    },
    onDeleteNote: (state, action) => ({
      ...state,
    }),
    onDeleteNoteSuccess: (state, action) => {
      return {
        ...state,
        notes: deleteNotes(state.notes, action.payload),
      };
    },
    onSelectedNote: (state, action) => {
      const filteredVideo = state.learning.videoDto.find(
        (video) => video.lessonId === action.payload.lessonId
      );

      return {
        ...state,
        sectionId: action.payload.sectionId,
        lessonId: action.payload.lessonId,
        resumePoint: action.payload.resumePoint,
        video: filteredVideo,
      };
    },
  },
});

export const {
  onCourseInitalState,
  onReload,
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
  onReady,
  onLoadNote,
  onLoadNoteSuccess,
  onSaveNote,
  onSaveNoteSuccess,
  onDeleteNote,
  onDeleteNoteSuccess,
  onSelectedNote,
} = courseSlice.actions;
// courseReducer
export default courseSlice.reducer;
