const {
  default: axiosInstance,
  axiosBearer,
} = require("../../api/axiosInstance");

export const requestLoadCategoryEnrollmentChart = () => {
  return axiosBearer.get(`/home/admin/category-chart`);
};

export const requestLoadRevenueYearChart = (year) => {
  return axiosBearer.get(`/home/admin/revenue-year-chart/${year}`);
};
