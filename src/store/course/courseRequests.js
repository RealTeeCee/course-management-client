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
export const requestEnrollId = (data) => {
  return axiosBearer.post(`/enrollment/getEnrollId`, data);
};
export const requestLearning = (courseId) => {
  return axiosBearer.get(`/track/learning/${courseId}`);
};
export const requestLoadTracking = (data) => {
  return axiosBearer.post(`/track/load`, data);
};
export const requestSaveTracking = (data) => {
  return axiosBearer.post(`/track/save`, data);
};
