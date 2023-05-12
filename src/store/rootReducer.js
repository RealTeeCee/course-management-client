import { loginReducer } from "./login/reducer";
import { userReducer } from "./user/reducer";

const { combineReducers } = require("@reduxjs/toolkit");

export const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
});
