import { call, put } from "redux-saga/effects";
import {
  requestLoadCategoryEnrollmentChart,
  requestLoadRevenueYearChart,
} from "./dashboardRequests";
import {
  onLoadCategoryEnrollmentChartSuccess,
  onLoadRevenueYearChartSuccess,
} from "./dashboardSlice";

function* handleOnLoadCategoryEnrollmentChart() {
  try {
    const res = yield call(requestLoadCategoryEnrollmentChart);

    if (res.status === 200) {
      yield put(onLoadCategoryEnrollmentChartSuccess(res.data));
    } else {
      // toast.error(MESSAGE_GENERAL_FAILED);
    }
  } catch (error) {
    console.log(error);
    // showMessageError(error);
  }
}

function* handleOnLoadRevenueYearChart({ payload }) {
  try {
    const res = yield call(requestLoadRevenueYearChart, payload ? payload : 0);

    if (res.status === 200) {
      yield put(onLoadRevenueYearChartSuccess(res.data));
    } else {
      // toast.error(MESSAGE_GENERAL_FAILED);
    }
  } catch (error) {
    console.log(error);
    // showMessageError(error);
  }
}

export { handleOnLoadCategoryEnrollmentChart, handleOnLoadRevenueYearChart };
