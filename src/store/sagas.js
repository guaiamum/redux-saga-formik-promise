import { call, put, takeLeading } from "redux-saga/effects";

import { apiConnection } from "../services/apiConnection";

function* postForm(action) {
  try {
    const { teams } = yield call(apiConnection, "quick");
    yield put({ type: "POST_FORM_SUCCESS", items: teams });
  } catch (e) {
    yield put({ type: "POST_FORM_FAILED", error: e.message });
  }
}

function* mySaga() {
  yield takeLeading("POST_FORM_REQUESTED", postForm);
}

export default mySaga;
