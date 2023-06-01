const { default: axiosInstance } = require("../../api/axiosInstance");

/**
 * **Request**
 */
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
