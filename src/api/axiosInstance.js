import axios from "axios";
import { BASE_API_URL } from "../constants/config";
import { getToken, setToken } from "../utils/auth";

// Default
const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
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

export const axiosBearer = axios.create({
  baseURL: BASE_API_URL,
});

axiosBearer.interceptors.request.use(
  (config) => {
    const { access_token } = getToken();
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosBearer.interceptors.response.use(
  (res) => res,
  async (error) => {
    const prevReq = error.config;
    if (
      (error?.response?.status === 401 || error?.response?.status === 403) &&
      !prevReq.sent
    ) {
      prevReq.sent = true;
      const { refresh_token } = getToken();
      console.log(refresh_token);
      console.log(prevReq);
      if (refresh_token) {
        const res = await axiosInstance.get(
          `/auth/refresh-token/${refresh_token}`
        );
        console.log(res);
        setToken(res.data.access_token, res.data.refresh_token);

        prevReq.headers.Authorization = `Bearer ${res.data.access_token}`;
      }

      return axiosBearer(prevReq); // newConfig
    }
    return Promise.reject(error);
  }
);
//Token

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const dispatch = useDispatch();

//     if (error.response.status === 401) {
//       if (error.response.data.error === "invalid_token") {
//         dispatch(onRemoveToken());
//       } else if (error.response.data.error === "expired_token") {
//         // Gửi yêu cầu refresh token
//         refreshAccessToken()
//           .then((response) => {
//             const { user, access_token } = response.data;
//             dispatch(onUpdateUserToken({ user, access_token }));
//           })
//           .catch((error) => {
//             // Xử lý lỗi khi không thể refresh token
//             console.log(error);
//           });
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // Hàm tưởng tượng để gửi yêu cầu refresh token
// function refreshAccessToken() {
//   return axios.post(`${BASE_API_URL}/refresh-token`);
// }

export default axiosInstance;
