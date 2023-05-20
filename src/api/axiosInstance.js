import axios from "axios";
import { BASE_API_URL, API_REFRESH_TOKEN_URL } from "../constants/config";

// Redux
const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch Data using with Hook useAxiosPrivate
export const axiosPrivate = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

// axiosInstance.interceptors.request.use(
//   function (config) {
//     const { access_token } = getToken();
//     if (access_token) {
//       config.headers.Authorization = `Bearer ${access_token}`;
//     }
//     return config;
//   },

//   function (error) {
//     return Promise.reject(error);
//   }
// );

// const accessTokenHoc = (previousAPI) => {
//   const innerAccessToken = async () => {
//     const { refresh_token } = getToken();
//     const res = await axiosInstance.get(
//       `${API_REFRESH_TOKEN_URL}/${refresh_token}`
//     );

//     if (res) {
//       if (res.data.access_token && res.data.refresh_token) {
//         // localStorage.setItem("accessToken", res.data.access_token);
//         // localStorage.setItem("refreshToken", res.data.refresh_token);

//         saveToken(res.data.access_token, res.data.refresh_token);
//         previousAPI.headers.Authorization = `Bearer ${res.data.access_token}`;
//         return axiosInstance.request(previousAPI);
//       } else {
//         // localStorage.setItem("accessToken", "");
//         // localStorage.setItem("refreshToken", "");
//         removeToken();
//         return null;
//       }
//     }
//   };
//   return innerAccessToken;
// };

// //null --> only check when error!!!
// axiosInstance.interceptors.response.use(null, function (error) {
//   if (
//     error.config &&
//     (error.response?.status === 401 || error.response?.status === 403) &&
//     !error.config.__isRetry
//   ) {
//     return new Promise((resolve, reject) => {
//       store.dispatch(refreshToken());
//       const callAccess = accessTokenHoc(error.config);
//       callAccess(error.config)
//         .then((result) => {
//           if (result) {
//             store.dispatch(refreshTokenSuccess());
//           } else {
//             store.dispatch(refreshTokenFailed());
//           }

//           resolve(result);
//         })
//         .catch((err) => {
//           store.dispatch(refreshTokenFailed());
//           reject(err);
//         });
//     });
//   }
//   return Promise.reject(error);
// });

export default axiosInstance;
