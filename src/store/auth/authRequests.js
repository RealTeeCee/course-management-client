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
  // if(!token) return;
  return axiosInstance.get("/auth/user/me", {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
};
