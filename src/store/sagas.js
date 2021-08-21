import { call, takeLeading } from "redux-saga/effects";

import { apiConnection } from "../services/apiConnection";

function* postForm(action) {
  try {
    const { teams } = yield call(apiConnection, "quick", action.data);

    action.res(teams);
  } catch (e) {
    action.rej();
  }
}

function* mySaga() {
  yield takeLeading("POST_FORM_REQUESTED", postForm);
}

export default mySaga;
