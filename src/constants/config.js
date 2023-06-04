export const APP_KEY_NAME = "course";
export const BASE_DOMAIN_URL =
  process.env.REACT_APP_DOMAIN_URL ?? "http://localhost:3000";
export const BASE_API_URL =
  process.env.REACT_APP_API_URL ?? "http://localhost:8080";

export const COOKIE_ACCESS_TOKEN_KEY = `${APP_KEY_NAME}_access_token`;
export const COOKIE_REFRESH_TOKEN_KEY = `${APP_KEY_NAME}_refresh_token`;
export const COOKIE_EXPIRED_DAYS = 30;

export const MIN_LENGTH_NAME = 3;
export const MAX_LENGTH_NAME = 100;
export const MAX_LENGTH_VARCHAR = 255;
export const LIMIT_PAGE = 12;

export const MESSAGE_GENERAL_FAILED = "Something was wrong!";
export const MESSAGE_FIELD_REQUIRED = "This field is required";
export const MESSAGE_FIELD_MIN_LENGTH_NAME = `This field at least ${MIN_LENGTH_NAME} characters`;
export const MESSAGE_FIELD_MAX_LENGTH_NAME = `This field only accept ${MAX_LENGTH_NAME} characters`;
export const MESSAGE_FIELD_MAX_LENGTH_VARCHAR = `This field only accept ${MAX_LENGTH_VARCHAR} characters`;
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

export const MESSAGE_EMAIL_ACTIVED = "Your email has already been activated !";

export const MESSAGE_UNAUTHORIZE = "Please login first then access this page";
export const MESSAGE_FORBIDDEN = "You dont have permission to access this page";
export const MESSAGE_NOT_FOUND = "Oops! You've accessed the wrong URL.";
export const MESSAGE_BAD_REQUEST = "Oops! Your request have problem";

export const MESSAGE_NO_ITEM_SELECTED = "No items selected";
export const MESSAGE_NET_PRICE_HIGHER_PRICE =
  "The sale price is not allowed to be higher than the original price";

// Data Static List
export const categoryItems = [
  {
    value: 1,
    label: "Programming",
    slug: "programming",
    image:
      "https://www.theschoolrun.com/sites/theschoolrun.com/files/article_images/what_is_a_programming_language.jpg",
    description:
      "Explore the world of programming and learn how to create software, websites, and applications. Gain hands-on experience with popular programming languages and tools, and build a foundation for a successful career in technology.",
  },
  {
    value: 2,
    label: "Graphic Design",
    slug: "graphic-design",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8R3JhcGhpYyUyMERlc2lnbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Unleash your creativity with graphic design. Learn how to create visually appealing designs, manipulate images, and develop skills using popular design software. Discover the art of communication through visual elements.",
  },
  {
    value: 3,
    label: "Artificial Intelligence",
    slug: "artificial-intelligence",
    image:
      "https://media.istockphoto.com/id/1440356809/photo/artificial-intelligence-technology-robot-futuristic-data-science-data-analytics-quantum.webp?b=1&s=170667a&w=0&k=20&c=wXYn8o0Y5OYTZbRFTeXvyQ2V4dt8HMHPLgFSJxjqWcg=",
    description:
      "Dive into the fascinating field of Artificial Intelligence (AI). Learn about machine learning, neural networks, and data analysis algorithms. Explore how AI is transforming various industries and gain insights into the future of intelligent systems.",
  },
  {
    value: 4,
    label: "Data Science",
    slug: "data-science",
    image:
      "https://media.istockphoto.com/id/1405263192/vi/anh/kh%C3%A1i-ni%E1%BB%87m-khoa-h%E1%BB%8Dc-d%E1%BB%AF-li%E1%BB%87u.jpg?s=2048x2048&w=is&k=20&c=U5JcK90r1rbbLMuQm9G8e3BvFerS4fSLbS4BRyQYZd4=",
    description:
      "Unlock the power of data through data science. Discover techniques for analyzing and interpreting data, and gain insights to drive informed decision-making. Learn how to extract meaningful information from complex datasets and solve real-world problems.",
  },
];

export const statusItems = [
  {
    value: 1,
    label: "Active",
  },
  {
    value: 0,
    label: "InActive",
  },
];

export const levelItems = [
  {
    value: 1,
    label: "Advance",
  },
  {
    value: 0,
    label: "Basic",
  },
];
