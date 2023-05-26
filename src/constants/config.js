export const APP_KEY_NAME = "course";
export const BASE_DOMAIN_URL =
  process.env.REACT_APP_DOMAIN_URL ?? "http://localhost:3000";
export const BASE_API_URL =
  process.env.REACT_APP_API_URL ?? "http://localhost:8080";

export const COOKIE_ACCESS_TOKEN_KEY = `${APP_KEY_NAME}_access_token`;
export const COOKIE_REFRESH_TOKEN_KEY = `${APP_KEY_NAME}_refresh_token`;
export const COOKIE_EXPIRED_DAYS = 30;

export const MAX_LENGTH_NAME = 100;
export const MAX_LENGTH_VARCHAR = 255;
export const LIMIT_PAGE = 12;

export const MESSAGE_GENERAL_FAILED = "Something was wrong!";
export const MESSAGE_FIELD_REQUIRED = "This field is required";
export const MESSAGE_UPLOAD_REQUIRED = "This field requires uploading a file";
export const MESSAGE_POLICY_REQUIRED =
  "Please review and accept our Policy before register";
export const MESSAGE_NUMBER_REQUIRED = "This field must be a number";
export const MESSAGE_FIELD_INVALID = "This field is invalid";
export const MESSAGE_EMAIL_INVALID =
  "Invalid email! Correct: example@domain.com";
export const MESSAGE_UPLOAD_IMAGE_FAILED = "Upload image error!";
export const MESSAGE_NUMBER_POSITIVE =
  "This field must be greater than or equal to 0";
export const MESSAGE_REGISTER_FAILED = "Register new account failed !";
export const MESSAGE_LOGIN_FAILED =
  "Login failed !Incorrect email or password!";

export const MESSAGE_REGISTER_SUCCESS =
  "You have registered new account successfully !";
export const MESSAGE_LOGIN_SUCCESS = "You have logged successfully !";
export const MESSAGE_LOGOUT_SUCCESS = "You have logged out successfully !";
export const MESSAGE_VERIFY_SUCCESS =
  "Your email has been verified! You can login now";

export const MESSAGE_UNAUTHORIZE = "Please login first then access this page";
export const MESSAGE_FORBIDDEN = "You dont have permission to access this page";
export const MESSAGE_NOT_FOUND = "Oops! You've accessed the wrong URL.";
export const MESSAGE_BAD_REQUEST = "Oops! Your request have problem";

// Data API
export const categoryItems = [
  {
    value: 1,
    label: "Programming",
  },
  {
    value: 2,
    label: "Graphic Design",
  },
  {
    value: 3,
    label: "Artificial Intelligence",
  },
  {
    value: 4,
    label: "Data Science",
  },
];
