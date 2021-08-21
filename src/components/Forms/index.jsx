import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action';

import { POST_FORM_FAILED, POST_FORM_REQUESTED, POST_FORM_SUCCESS } from "../../store/form/actions";
import { Loading } from "../Loading";

import { formikConfig } from "./formikConfig";

/**
 * 1 read this first
 * This renders a formik Form and a text input field,
 * below it, we have the magic ingredient, the submit button
 * which needs to bind itself to the form's loading state
 * This is achieved with the help from `redux-wait-for-action`
 * @param {Props} props
 */
const Teams = ({ dispatch, teams }) => {
  /**
   * Now our submitHandler returns a Promise, which
   * Formik handles automagically and sets isSubmitting to
   * false once it resolves
   * @param {Object} values form values
   * @param {Object} actions form actions
   * @returns 
   */
  const submitHandler = (values, { setSubmitting }) => {
    return dispatch({ type: POST_FORM_REQUESTED, data: values,
        [WAIT_FOR_ACTION]: POST_FORM_SUCCESS,
        [ERROR_ACTION]: POST_FORM_FAILED
      });
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
            {/* Now we can conditionally render the loading based on the form's state, instead of store's */}
            { isSubmitting ? <Loading message="Hold your pants..." /> : "Save it!" }
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
 * 3 Finally,
 * we still need connecting to receive the response
 */
export default connect((state) => state.forms)(Teams);
