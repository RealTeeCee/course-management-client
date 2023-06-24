const { axiosBearer } = require("../../api/axiosInstance");

/**
 * **Request**
 */
export const requestMyCourse = (userId) => {
  return axiosBearer.get(`/course/my-course/${userId}`);
};
export const requestCourse = () => {
  return axiosBearer.get(`/course`);
};
export const requestFreeCourse = () => {
  return axiosBearer.get(`/course/free-course`);
};
export const requestBestSellerCourse = () => {
  return axiosBearer.get(`/course/best-course`);
};
export const requestRelatedCourse = (data) => {
  return axiosBearer.post(`/course/related-course`, data);
};
export const requestEnrollId = (data) => {
  return axiosBearer.post(`/enrollment/getEnrollId`, data);
};
export const requestLearning = (courseId) => {
  return axiosBearer.get(`/track/learning/${courseId}`);
};
export const requestLoadTracking = (data) => {
  return axiosBearer.post(`/track/load`, data);
};
export const requestSaveTrackingVideo = (data) => {
  return axiosBearer.post(`/track/save`, data);
};
export const requestSaveTrackingLesson = (data) => {
  return axiosBearer.post(`/track/save-tracking-lesson`, data);
};
export const requestUpdateCompleted = (data) => {
  return axiosBearer.post(`/track/complete`, data);
};
export const requestLoadProgress = (data) => {
  return axiosBearer.post(`/track/load-progress`, data);
};
export const requestLoadNote = (data) => {
  return axiosBearer.post(`/track/load-notes`, data);
};
export const requestSaveNote = (data) => {
  return axiosBearer.post(`/track/save-note`, data);
};
export const requestDeleteNote = (noteId) => {
  return axiosBearer.delete(`/track/delete-note/${noteId}`);
};
export const requestSavePost = (data) => {
  return axiosBearer.post(`/post`, data);
};
export const requestDeletePost = (postId) => {
  return axiosBearer.delete(`/post/${postId}`);
};
export const requestSaveReply = (data) => {
  return axiosBearer.post(`/post/comment`, data);
};
export const requestDeleteReply = (commentId) => {
  return axiosBearer.delete(`/post/comment/${commentId}`);
};
export const requestSaveLike = (data) => {
  return axiosBearer.post(`/post/like`, data);
};
export const requestLoadNotification = (userId) => {
  return axiosBearer.post(`/notification/${userId}`);
};
export const requestReadNotification = (notifId) => {
  return axiosBearer.patch(`/notification/read/${notifId}`);
};
export const requestUpdateUserRating = (data) => {
  return axiosBearer.post(`/enrollment/rating`, data);
};
export const requestLoadCourseRating = (courseId) => {
  return axiosBearer.get(`/enrollment/rating/${courseId}`);
};
