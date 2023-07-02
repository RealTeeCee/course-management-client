import authReducer from "./auth/authSlice";
import courseReducer from "./course/courseSlice";
import partReducer from "./admin/part/partSlice";
import questionReducer from "./admin/question/questionSlice";
import answerReducer from "./admin/answer/answerSlice";

const { combineReducers } = require("@reduxjs/toolkit");

export const rootReducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
  part: partReducer,
  question: questionReducer,
  answer: answerReducer,
});
