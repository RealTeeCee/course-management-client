import { BASE_API_URL, BASE_DOMAIN_URL } from "./config";

export const IMG_BB_URL =
  "https://api.imgbb.com/1/upload?key=a3677081e3e3345b34519f94cd1017e1";

// ******************* Authentication ENDPOINT *********************
export const API_REGISTER_URL = "/auth/register";
export const API_LOGIN_URL = "/auth/login";
export const API_VERIFY_URL = "/verifyEmail";
export const API_REFRESH_TOKEN_URL = "/auth/refresh-token";
export const API_CURRENT_USER_URL = "/auth/user/me";

export const OAUTH2_REDIRECT_URI = `${BASE_DOMAIN_URL}/oauth2/redirect`;
export const GOOGLE_AUTH_URL = `${BASE_API_URL}/oauth2/authorize/google?redirect_uri=${OAUTH2_REDIRECT_URI}`;
export const FACEBOOK_AUTH_URL = `${BASE_API_URL}/oauth2/authorize/facebook?redirect_uri=${OAUTH2_REDIRECT_URI}`;
export const GITHUB_AUTH_URL = `${BASE_API_URL}/oauth2/authorize/github?redirect_uri=${OAUTH2_REDIRECT_URI}`;
export const LINKEDIN_AUTH_URL = `${BASE_API_URL}/oauth2/authorize/linkedin?redirect_uri=${OAUTH2_REDIRECT_URI}`;

// ******************* API ENDPOINT *********************
export const API_COURSE_URL = "/course";
export const API_IMG_URL = "/course/download"; // Example: "/course/download?courseId=";
