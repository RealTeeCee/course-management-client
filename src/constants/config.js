export const BASE_API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";

export const MAX_LENGTH_NAME = 100;
export const MAX_LENGTH_VARCHAR = 255;
export const LIMIT_PAGE = 12;

export const MESSAGE_GENERAL = "Something was wrong!";
export const MESSAGE_REQUIRED = "This fields is required";
export const MESSAGE_EMAIL = "Invalid email! Correct: example@fpt.com";

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
