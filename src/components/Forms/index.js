import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, useFormikContext } from "formik";

import { POST_FORM_REQUESTED } from "../../store/form/actions";
import { Loading } from "../Loading";

import { formikConfig } from "./formikConfig";
import "./index.scss";

/**
 * 2 then this
 * This little guy has one job, and one job only,
 * to render a loading indicator when it's mounted,
 * and to set the form's loading (submitting) state to
 * NOT SUBMITTING when it's unmounted
 */
const LoadingHandler = () => {
  const { setSubmitting } = useFormikContext();

  // resets the form state on unmount
  useEffect(() => () => {
    setSubmitting(false);
  });
  return <Loading message="Hold your pants..." />;
};

/**
 * 1 read this first
 * This renders a formik Form and a text input field,
 * below it, we hve the magic ingredient, the submit button
 * which needs to bind itself to the app's store loading state
 * This is achieved with the above component `LoadingHandler`
 * @param {Props} props
 */
const Teams = ({ dispatch, loading }) => {
  return (
    <Formik
      {...formikConfig}
      onSubmit={(values, { setSubmitting }) => {
        dispatch({ type: POST_FORM_REQUESTED, data: values });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2>Form</h2>
          <Field name="name" type="text">
            {({ field, meta }) => (
              <div>
                <input type="text" placeholder="Name" {...field} />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <button type="submit" disabled={isSubmitting}>
            {/* conditionally rendering the component which will update the forms' state */}
            {loading ? <LoadingHandler /> : "Save it!"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

/**
 * Finally, the binding between the saga's server waiting,
 * and the form's, is done via mounting and unmounting the `LoadingHandler` component
 * ie. I need two things to do one job
 */
export default connect((state) => state.forms)(Teams);
