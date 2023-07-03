import Cookies from "js-cookie";
import {
  APP_KEY_NAME,
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_EXPIRED_DAYS,
  COOKIE_REFRESH_TOKEN_KEY,
} from "../constants/config";

export const objCookies = {
  expires: COOKIE_EXPIRED_DAYS,
  domain: process.env.REACT_APP_COOKIE_DOMAIN,
}; 

export const setToken = (access_token, refresh_token) => {
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

export const removeToken = () => {
  const access_token = Cookies.get(COOKIE_ACCESS_TOKEN_KEY);
  if (access_token) {
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

// save Cookie remember password
export const setRememberPassword = (email, password) => {
  Cookies.set(`${APP_KEY_NAME}__${email}`, password);
};


