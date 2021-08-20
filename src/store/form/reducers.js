import {
  POST_FORM_FAILED,
  POST_FORM_REQUESTED,
  POST_FORM_SUCCESS
} from "./actions";

export const formsReducer = (
  state = { loading: false },
  { type, ...action }
) => {
  switch (type) {
    case POST_FORM_REQUESTED:
      return { ...state, loading: true };
    case POST_FORM_SUCCESS:
      return { ...state, ...action, loading: false };
    case POST_FORM_FAILED:
      return { ...state, ...action, loading: false };

    default:
      return state;
  }
};
