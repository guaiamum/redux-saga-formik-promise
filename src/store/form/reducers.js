import {
  POST_FORM_REQUESTED,
  // no need for those actions
  // POST_FORM_FAILED,
  // POST_FORM_SUCCESS
} from "./actions";

export const formsReducer = (
  state = { loading: false, teams: [] },
  { type, ...action }
) => {
  switch (type) {
    case POST_FORM_REQUESTED:
      return { ...state };

    default:
      return state;
  }
};
