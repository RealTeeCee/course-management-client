import axiosInstance from "../api/axiosInstance";
import { getToken } from "../utils/auth";

export default function useRefreshToken() {
  async function refreshToken() {
    const { refresh_token } = getToken();
    if (!refresh_token) return null;
    try {
      const res = await axiosInstance.get(
        `/auth/refresh-token/${refresh_token}`
      );

      if (!res.data) return null;

      // setToken(res.data.access_token, res.data.refresh_token);
      // onUpdateUserToken((prev) => ({
      //   ...prev,
      //   access_token: res.data.access_token,
      // }));

      return res.data.access_token;
    } catch (error) {
      console.log(error);
    }
  }

  return refreshToken;
}
