import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { showMessageError } from "../../utils/helper";
import { requestSection } from "./sectionRequests";
import { onSectionFailed, onSectionSuccess } from "./sectionSlice";

/**
 * *** Handler ***
 */

function* handleOnSectionLoading() {
  try {
    const res = yield call(requestSection);
    console.log(res.data);

    if (res.status === 200) {
      yield put(onSectionSuccess(res.data));
    } else {
      yield put(onSectionFailed(res.data));
    }
  } catch (error) {
    showMessageError(error);
  }
}

export { handleOnSectionLoading };
