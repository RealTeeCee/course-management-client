const BASE_URL = process.env.REACT_APP_API_URL; //?? "http://localhost:8080";
export const REGISTER_URL = "/auth/register";
export const LOGIN_URL = "/auth/login";
export const VERIFY_URL = "/verifyEmail";
export const REFRESH_TOKEN_URL = "/auth/refresh-token";
export const CURRENT_USER_URL = "/auth/user/me";

export const OAUTH2_REDIRECT_URI = "http://localhost:3000/oauth2/redirect";

export const GOOGLE_AUTH_URL =
  BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
  BASE_URL + "/oauth2/authorize/facebook?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL =
  BASE_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const LINKEDIN_AUTH_URL =
  BASE_URL + "/oauth2/authorize/linkedin?redirect_uri=" + OAUTH2_REDIRECT_URI;

export default BASE_URL;
