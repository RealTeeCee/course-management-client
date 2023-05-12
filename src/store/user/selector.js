import { createSelector } from "@reduxjs/toolkit";

const selectUserReducer = (state) => state.user; //store in rootReducer

export const selectUserData = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.data
);

export const selectUserIsFetching = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.isFetching
);

export const selectUserIsSuccess = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.isSuccess
);

export const selectUserFailed = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.error
);
