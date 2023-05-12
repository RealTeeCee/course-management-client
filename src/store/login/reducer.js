import { LOGIN_TYPE } from "./type";

const LOGIN_INITIAL_STATE = {
  isFetching: false,
  isLoginSuccess: false,
  isRefreshSuccess: false,
  data: null,
  error: "",
};

export const loginReducer = (state = LOGIN_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_TYPE.INITIAL_LOGIN_FORM:
      return {
        ...LOGIN_INITIAL_STATE,
      };
    case LOGIN_TYPE.LOGIN_START:
      return {
        ...state,
        isFetching: true,
      };
    case LOGIN_TYPE.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoginSuccess: true,
        data: payload,
      };
    case LOGIN_TYPE.LOGIN_FAILED:
      return {
        ...state,
        data: "",
        isFetching: false,
        isLoginSuccess: false,
        error: payload,
      };
    case LOGIN_TYPE.LOGIN_OAUTH_START:
      return {
        ...state,
        isFetching: true,
      };
    case LOGIN_TYPE.LOGIN_OAUTH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoginSuccess: true,
      };
    case LOGIN_TYPE.LOGIN_OAUTH_FAILED:
      return {
        ...state,
        isFetching: false,
        isLoginSuccess: false,
        error: payload,
      };
    case LOGIN_TYPE.REFRESH_TOKEN_START:
      return {
        ...state,
        isFetching: true,
      };
    case LOGIN_TYPE.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isRefreshSuccess: true,
      };
    case LOGIN_TYPE.REFRESH_TOKEN_FAILED:
      return {
        ...state,
        isFetching: false,
        isRefreshSuccess: false,
        error: payload,
      };
    default:
      return state;
  }
};
