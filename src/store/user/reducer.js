import { USER_TYPE } from "./type";

const USER_INITIAL_STATE = {
  isFetching: false,
  isSuccess: false,
  error: "",
  data: {},
};

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case USER_TYPE.GET_CURRENT_USER:
      return {
        ...state,
        isFetching: true,
      };
    case USER_TYPE.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        data: payload,
      };
    case USER_TYPE.GET_CURRENT_USER_FAILED:
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        error: payload,
      };
    default:
      return state;
  }
};
