import { axiosBearer } from "../../../api/axiosInstance";

export const requestGetUsers = () => {
  return axiosBearer.get("/auth/user");
};

export const requestUpdateUser = (data) => {
  return axiosBearer.put(`/auth/user`, data);
};

export const requestGetUserRegisteredToday = () => {
  return axiosBearer.get(`/auth/user-registered-today`);
};
