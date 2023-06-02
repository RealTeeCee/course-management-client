import authReducer from "./auth/authSlice";
import courseReducer from "./course/courseSlice";

/**
 * **** Reducer ****
 */
const { combineReducers } = require("@reduxjs/toolkit");
export const rootReducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
});
