import axios from "axios";
import { BASE_API_URL } from "../constants/config";
import { onRemoveToken, onUpdateUserToken } from "../store/auth/authSlice";
import { useDispatch } from "react-redux";
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
