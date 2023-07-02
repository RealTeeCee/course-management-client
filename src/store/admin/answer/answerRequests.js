import { axiosBearer } from "../../../api/axiosInstance";

export const requestGetAnswersByCourseId = (partId) => {
  return axiosBearer.get(`/part/${partId}/question`);
};

export const requestPostAnswer = (data) => {
  return axiosBearer.post(`/part/${data.partId}/question`, data);
};

export const requestDeleteAnswer = (data) => {
  return axiosBearer.delete(
    `/part/{partId}/question?questionId=${data.questionId ?? data.id}`
  );
};
