import authReducer from "./auth/authSlice";
import courseReducer from "./course/courseSlice";
import partReducer from "./admin/part/partSlice";

const { combineReducers } = require("@reduxjs/toolkit");
export const rootReducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
  part: partReducer,
});
