import { useEffect } from "react";
import { axiosPrivate } from "../api/axiosInstance";
import useRefreshToken from "./useRefreshToken";
import { getToken } from "../utils/auth";

export default function useAxiosPrivate() {
  const refreshToken = useRefreshToken();
  const { access_token } = getToken();
  useEffect(() => {
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const resInterceptor = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (error) => {
        const prevReq = error.config;
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !prevReq.sent
        ) {
          prevReq.sent = true;

          const newAccessToken = await refreshToken();
          prevReq.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevReq); // newConfig
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqInterceptor);
      axiosPrivate.interceptors.response.eject(resInterceptor);
    };
  }, [access_token, refreshToken]);

  return axiosPrivate;
}
