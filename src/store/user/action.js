import { USER_TYPE } from "./type";

export const getCurrentUser = () => ({
  type: USER_TYPE.GET_CURRENT_USER,
  // if (!localStorage.getItem("accessToken")) {
  //   return Promise.reject("No access token set.");
  // }

  // return request({
  //   url: API_BASE_URL + "/auth/user/me",
  //   method: "GET",
  // });
});

export const getCurrentUserSuccess = (data) => ({
  type: USER_TYPE.GET_CURRENT_USER_SUCCESS,
  payload: data,
});

export const getCurrentUserFailed = (error) => ({
  type: USER_TYPE.GET_CURRENT_USER_FAILED,
  payload: error,
});
