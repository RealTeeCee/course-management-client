import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../api/axiosInstance";
import { getToken } from "../utils/auth";
import useRefreshToken from "./useRefreshToken";

export default function useAxiosPrivate() {
  const refreshToken = useRefreshToken();
  const { auth } = useSelector((state) => state);
  useEffect(() => {
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        // Check headers if dont has Authorization
        if (!config.headers["Authorization"]) {
          // config.headers["Authorization"] = `Bearer ${auth.access_token}`;
          config.headers.Authorization = `Bearer ${auth.access_token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const resInterceptor = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (error) => {
        const prevReq = error.config;
        if (error?.response?.status >= 400 && !prevReq.sent) {
          prevReq.sent = true;

          const newAccessToken = await refreshToken();
          prevReq.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevReq); // newConfig
        }

        return Promise.reject((error) => {
          return error;
        });
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqInterceptor);
      axiosPrivate.interceptors.request.eject(resInterceptor);
    };
  }, [auth.access_token, refreshToken]);

  return axiosPrivate;
}
