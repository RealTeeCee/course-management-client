const {
  default: axiosInstance,
  axiosBearer,
} = require("../../api/axiosInstance");

export const requestLoadTop3Authors = () => {
  return axiosBearer.get(`/author/top3`);
};

export const requestLoadAuthorsPagination = (data) => {
  return axiosBearer.post(`/author/authors-pagination`, data);
};
export const requestLoadSubcribesByUserId = ({ userId }) => {
  return axiosBearer.get(`/subcribes/${userId}`);
};
export const requestSubcribeAuthor = (data) => {
  return axiosBearer.post(`/subcribes`, data);
};

export const requestUnsubcribeAuthor = (data) => {
  return axiosBearer.delete(`/subcribes`, data);
};

export const requestLoadAuthor = (authorId) => {
  return axiosBearer.get(`/author/${authorId}`);
};
