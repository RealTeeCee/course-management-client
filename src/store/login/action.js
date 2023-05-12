import { LOGIN_TYPE } from "./type";

export const loginOAuthStart = () => ({
  type: LOGIN_TYPE.LOGIN_OAUTH_START,
});

export const loginOAuthSuccess = (data) => ({
  type: LOGIN_TYPE.LOGIN_OAUTH_SUCCESS,
  payload: data,
});

export const loginOAuthFailed = (error) => ({
  type: LOGIN_TYPE.LOGIN_OAUTH_FAILED,
  payload: error,
});

export const loginStart = (data) => ({
  type: LOGIN_TYPE.LOGIN_START,
  payload: data,
});

export const loginSuccess = (data) => ({
  type: LOGIN_TYPE.LOGIN_SUCCESS,
  payload: data,
});

export const loginFailed = () => ({
  type: LOGIN_TYPE.INITIAL_LOGIN_FORM,
});

export const refreshToken = () => ({
  type: LOGIN_TYPE.REFRESH_TOKEN_START,
});

export const refreshTokenSuccess = () => ({
  type: LOGIN_TYPE.REFRESH_TOKEN_SUCCESS,
});

export const refreshTokenFailed = () => ({
  type: LOGIN_TYPE.REFRESH_TOKEN_FAILED,
});

export const initialLogin = () => ({
  type: LOGIN_TYPE.INITIAL_LOGIN_FORM,
});
