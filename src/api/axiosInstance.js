import axios from "axios";
import BASE_URL, { REFRESH_TOKEN_URL } from "./url";
import { store } from "../store/configureStore";
import {
  refreshToken,
  refreshTokenFailed,
  refreshTokenSuccess,
} from "../store/login/action";

let _isRetry = false;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

const accessTokenHoc = (previousAPI) => {
  const innerAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await axiosInstance.get(`${REFRESH_TOKEN_URL}/${refreshToken}`);

    if (res) {
      if (res.data.access_token && res.data.refresh_token) {
        _isRetry = false;
        localStorage.setItem("accessToken", res.data.access_token);
        localStorage.setItem("refreshToken", res.data.refresh_token);
        previousAPI.headers.Authorization = `Bearer ${res.data.access_token}`;
        return axiosInstance.request(previousAPI);
      } else {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("refreshToken", "");
        return null;
      }
    }
  };
  return innerAccessToken;
};

//null --> only check when error!!!
axiosInstance.interceptors.response.use(null, function (error) {
  if (
    error.config &&
    (error.response?.status === 401 || error.response?.status === 403) &&
    !_isRetry
  ) {
    _isRetry = true;
    return new Promise((resolve, reject) => {
      store.dispatch(refreshToken());
      const callAccess = accessTokenHoc(error.config);
      callAccess(error.config)
        .then((result) => {
          if (result) {
            store.dispatch(refreshTokenSuccess());
          } else {
            store.dispatch(refreshTokenFailed());
          }

          resolve(result);
        })
        .catch((err) => {
          store.dispatch(refreshTokenFailed());
          reject(err);
        });
    });
  }
  return Promise.reject(error);
});

export default axiosInstance;
