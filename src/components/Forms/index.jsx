import { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, useFormikContext } from "formik";

import { POST_FORM_REQUESTED } from "../../store/form/actions";
import { Loading } from "../Loading";

import { formikConfig } from "./formikConfig";

/**
 * 1 read this first
 * This renders a formik Form and a text input field,
 * below it, we hve the magic ingredient, the submit button
 * which needs to bind itself to the app's store loading state
 * This is achieved with the above component `LoadingHandler`
 * @param {Props} props
 */
const Teams = ({ dispatch, loading, teams }) => {
  const submitHandler = (values, { setSubmitting }) => {
    dispatch({ type: POST_FORM_REQUESTED, data: values });
  }
  return (
    <>
      <Formik
        {...formikConfig}
        onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2>Form</h2>
          <Field name="name" type="text">
            {({ field, meta }) => (
              <div>
                <input className="input" type="text" placeholder="Name" {...field} />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>

          {/* disabling and adding loading content to submit button */}
          <button type="submit" className='btn' disabled={isSubmitting}>
            {/* conditionally rendering the component which will update the forms' state */}
            {loading ? <LoadingHandler /> : "Save it!"}
          </button>
        </Form>
      )}
    </Formik>
      {teams.map(({ id, name }) => (
        <article key={id}>
          <h2>{name}</h2>
        </article>
      ))}
    </>
  );
};

/**
 * 2 then this
 * This little guy does two things:
 * renders a loading indicator when it's mounted,
 * and sets the form's loading (submitting) state to
 * **NOT SUBMITTING** when it's unmounted
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
 * 3 Finally,
 * the binding between the saga waiting on the response and the form
 * is done via mounting and unmounting the `LoadingHandler` component
 * ie. I need two things to do one job, not to mention the connect below
 */
export default connect((state) => state.forms)(Teams);
