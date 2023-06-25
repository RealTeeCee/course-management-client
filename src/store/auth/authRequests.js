const {
  default: axiosInstance,
  axiosBearer,
} = require("../../api/axiosInstance");

export const requestRegister = (data) => {
  return axiosInstance.post("/auth/register", data);
};

export const requestLogin = (data) => {
  return axiosInstance.post("/auth/login", data);
};

export const requestGetUser = (token) => {
  return axiosInstance.get("/auth/user/me", {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
};

export const requestRefreshToken = (refresh_token) => {
  return axiosInstance.get(`/auth/refresh-token/${refresh_token}`);
};

export const requestForgetPassword = (email) => {
  return axiosInstance.post(
    `/auth/forget-password`,
    JSON.stringify({
      email,
      oldPassword: "",
      password: "",
      confirmPassword: "",
    })
  );
};

export const requestResetPassword = ({ password, confirmPassword, token }) => {
  return axiosInstance.post(
    `/auth/reset-password?token=${encodeURIComponent(
      token
    )}&email=&oldPassword=&password=${encodeURIComponent(
      password
    )}&confirmPassword=${encodeURIComponent(confirmPassword)}`
  );
};

export const requestUserChangePassword = (data) => {
  return axiosBearer.post(`/auth/change-password`, data);
};

export const requestUserUpdateProfile = (data) => {
  return axiosInstance.put(`/auth/user`, data, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${data.access_token ?? ""}`,
    },
  });
};
