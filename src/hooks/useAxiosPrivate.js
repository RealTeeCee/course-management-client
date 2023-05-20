import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../api/axiosInstance";
import { getToken } from "../utils/auth";
import useRefreshToken from "./useRefreshToken";

export default function useAxiosPrivate() {
  const refreshToken = useRefreshToken();
  const { auth } = useSelector((state) => state);
  console.log("Access: ", auth.access_token);
  useEffect(() => {
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log("Config: ", config);
        // Check headers if dont has Authorization
        if (!config.headers["Authorization"]) {
          console.log("config Header: ", config.headers["Authorization"]);
          // config.headers["Authorization"] = `Bearer ${auth.access_token}`;
          config.headers.Authorization = `Bearer ${auth.access_token}`;
          console.log("config Header below: ", config.headers.Authorization);

        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const resInterceptor = axiosPrivate.interceptors.response.use(
      (res) => {
        console.log("in resInterceptor: ", res);
        return res;
      },
      async (error) => {
        const prevReq = error.config;
        console.log("prev: ", prevReq);
        console.log("prev.sent: ", prevReq.sent);
        console.log("error: ", error);
        if (error?.response?.status >= 400 && !prevReq.sent) {
          prevReq.sent = true;

          console.log("call refresh new in response");
          const newAccessToken = await refreshToken();
          console.log("below refreshToken() function call");
          prevReq.headers.Authorization = `Bearer ${newAccessToken}`;
          console.log("new Header: ", prevReq.headers["Authorization"]);


          return axiosPrivate(prevReq); // newConfig
        }

        return Promise.reject((error) => {
          console.log("Promise error:" , error);
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
