export const POST_FORM_REQUESTED = "POST_FORM_REQUESTED";
export const POST_FORM_FAILED = "POST_FORM_FAILED";
export const POST_FORM_SUCCESS = "POST_FORM_SUCCESS";

export const submitForm = (data) => ({
  type: POST_FORM_REQUESTED,
  data
});
