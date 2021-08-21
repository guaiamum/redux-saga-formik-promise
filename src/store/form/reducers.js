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
      return { ...state };

    default:
      return state;
  }
};
