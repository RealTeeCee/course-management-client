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
