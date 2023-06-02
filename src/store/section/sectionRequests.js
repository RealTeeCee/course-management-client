const { axiosBearer } = require("../../api/axiosInstance");

/**
 * **Request**
 */

export const requestSection = (courseId) => {
  return axiosBearer.get(`/course/${courseId}`);
};
