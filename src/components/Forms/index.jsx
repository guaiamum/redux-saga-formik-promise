import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";

import { POST_FORM_REQUESTED } from "../../store/form/actions";
import { Loading } from "../Loading";

import { formikConfig } from "./formikConfig";

/**
 * 1 read this first
 * This renders a formik Form and a text input field,
 * below it, we have the magic ingredient, the submit button
 * which needs to bind itself to the form's loading state
 * This is achieved with the above component `LoadingHandler`
 * @param {Props} props
 */
const Teams = ({ dispatch }) => {
  const [teams, setTeams] = useState([]);

  const submitHandler = (values, { setSubmitting }) => {
    return new Promise((res, rej) => {
      dispatch({ type: POST_FORM_REQUESTED, data: values, res, rej });
    }).then((res) => {
      // concating the teams resides in the component
      setTeams([...teams, ...res]);
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
 * no need to connect to store
 */
export default connect()(Teams);
