import axiosInstance from "../api/axiosInstance";
import { getToken, saveToken } from "../utils/auth";
import { onUpdateUserToken } from "../store/auth/authSlice.js";
import { toast } from "react-toastify";
import { MESSAGE_GENERAL_FAILED } from "../constants/config";

export default function useRefreshToken() {
  async function refreshToken() {
    const { refresh_token } = getToken();
    console.log("Refresh: ", refresh_token);
    if (!refresh_token) return null;
    try {
      console.log("before call res refresh in Hook: ");
      const res = await axiosInstance.get(
        `/auth/refresh-token/${refresh_token}`
      );
      console.log("res refresh in Hook: ", res);

      if (!res.data) return null;

      console.log("Save token...");
      // Case on DB Delete or change manual, need to saveToken to Cookie again
      saveToken(res.data.access_token, res.data.refresh_token);
      // dispatch(
      //   onUpdateUserToken((prev) => ({
      //     ...prev,
      //     access_token: res.data.access_token,
      //   }))
      // );

      return res.data.access_token;
    } catch (error) {
      console.log(error);
    }
  }

  return refreshToken;
}
