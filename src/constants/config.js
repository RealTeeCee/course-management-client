export const BASE_API_URL =
  process.env.REACT_APP_API_URL ?? "http://localhost:8080";
export const IMG_BB_API =
  "https://api.imgbb.com/1/upload?key=a3677081e3e3345b34519f94cd1017e1";

export const MAX_LENGTH_NAME = 100;
export const MAX_LENGTH_VARCHAR = 255;
export const LIMIT_PAGE = 12;

export const MESSAGE_GENERAL_FAILED = "Something was wrong!";
export const MESSAGE_FIELD_REQUIRED = "This field is required";
export const MESSAGE_UPLOAD_REQUIRED = "This field requires uploading a file";
export const MESSAGE_FIELD_INVALID = "This field is invalid";
export const MESSAGE_EMAIL_INVALID = "Invalid email! Correct: example@fpt.com";
export const MESSAGE_UPLOAD_IMAGE_FAILED = "Upload image error!";
export const MESSAGE_NUMBER_POSITIVE =
  "This field must be greater than or equal to 0";
export const MESSAGE_NUMBER_REQUIRED = "This field must be a number";
export const MESSAGE_REGISTER_FAILED = "Register new account failed !";
export const MESSAGE_LOGIN_FAILED = "Login failed !";

export const MESSAGE_REGISTER_SUCCESS =
  "You have registered new account successfully !";
export const MESSAGE_LOGIN_SUCCESS = "You have logged successfully !";
export const MESSAGE_VERIFY_SUCCESS =
  "Your email has been verified! You can login now";

export const MESSAGE_UNAUTHORIZE = "You dont have permission to access this page";

export const STATUS_SUCCESS = 200;
export const STATUS_CREATED = 201;
export const STATUS_NO_CONTENT = 204;

export const STATUS_BAD_REQUEST = 400;
export const STATUS_UNAUTHORIZE = 401;
export const STATUS_FORBIDDEN = 403;
export const STATUS_NOT_FOUND = 404;
export const STATUS_NOT_ALLOW = 405;
export const STATUS_NOT_ACCEPTABLE = 406;
export const STATUS_REQUEST_TIMEOUT = 408;
export const STATUS_UNPROCESSABLE = 422;

export const STATUS_INTERNAL_SERVER_ERROR = 500;
export const STATUS_SERVER_MAINTAINCE = 503;
