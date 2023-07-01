import authReducer from "./auth/authSlice";
import authorReducer from "./author/authorSlice";
import categoryReducer from "./category/categorySlice";
import courseReducer from "./course/courseSlice";

const { combineReducers } = require("@reduxjs/toolkit");
export const rootReducer = combineReducers({
  auth: authReducer,
  author: authorReducer,
  category: categoryReducer,
  course: courseReducer,
});
