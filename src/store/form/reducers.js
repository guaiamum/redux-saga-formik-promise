import {
  POST_FORM_FAILED,
  POST_FORM_REQUESTED,
  POST_FORM_SUCCESS
} from "./actions";

export const formsReducer = (
  state = { loading: false, teams: [] },
  { type, ...action }
) => {
  switch (type) {
    case POST_FORM_REQUESTED:
      return { ...state, loading: true };
      case POST_FORM_SUCCESS:
      // concating the teams resides in the reducer
      return { ...state, teams: [...state.teams,...action.teams], loading: false };
    case POST_FORM_FAILED:
      return { ...state, ...action, loading: false };

    default:
      return state;
  }
};
