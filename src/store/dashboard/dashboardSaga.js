import { takeLatest } from "redux-saga/effects";

import {
  onLoadCategoryEnrollmentChart,
  onLoadRevenueYearChart,
} from "./dashboardSlice";
import {
  handleOnLoadCategoryEnrollmentChart,
  handleOnLoadRevenueYearChart,
} from "./dashboardHandlers";

export default function* authSaga() {
  yield takeLatest(
    onLoadCategoryEnrollmentChart.type,
    handleOnLoadCategoryEnrollmentChart
  );
  yield takeLatest(onLoadRevenueYearChart.type, handleOnLoadRevenueYearChart);
}
