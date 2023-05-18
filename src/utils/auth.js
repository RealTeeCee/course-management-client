import Cookies from "js-cookie";
import { COOKIE_ACCESS_TOKEN_KEY, COOKIE_EXPIRED_DAYS, COOKIE_REFRESH_TOKEN_KEY } from "../constants/config";

const objCookies = {
  expires: COOKIE_EXPIRED_DAYS,
  domain: process.env.REACT_APP_COOKIE_DOMAIN,
};

export const saveToken = (access_token, refresh_token) => {
  if (access_token && refresh_token) {
    Cookies.set(COOKIE_ACCESS_TOKEN_KEY, access_token, {
      ...objCookies,
    });

    Cookies.set(COOKIE_REFRESH_TOKEN_KEY, refresh_token, {
      ...objCookies,
    });
  } else {
    Cookies.remove(COOKIE_ACCESS_TOKEN_KEY, {
      ...objCookies,
      path: "/",
      domain: process.env.REACT_APP_COOKIE_DOMAIN,
    });

    Cookies.remove(COOKIE_REFRESH_TOKEN_KEY, {
      ...objCookies,
      path: "/",
      domain: process.env.REACT_APP_COOKIE_DOMAIN,
    });
  }
};

export const getToken = () => {
  const access_token = Cookies.get(COOKIE_ACCESS_TOKEN_KEY);
  const refresh_token = Cookies.get(COOKIE_REFRESH_TOKEN_KEY);

  return {
    access_token,
    refresh_token,
  };
};
