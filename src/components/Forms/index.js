import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

import { POST_FORM_REQUESTED } from "../../store/form/actions";
import { Loading } from "../Loading";

import { formikConfig } from "./formikConfig";
import "./index.scss";

/**
 * 1 read this first
 * This renders a formik Form and a text input field,
 * below it, we hve the magic ingredient, the submit button
 * which needs to bind itself to the app's store loading state
 * This is achieved with the above component `LoadingHandler`
 * @param {Props} props
 */
const Teams = ({ dispatch, loading }) => {
  const [teams, setTeams] = useState([]);
  return (
    <>
      <Formik
        {...formikConfig}
        onSubmit={(values, { setSubmitting }) => {
          return new Promise((res, rej) => {
            dispatch({ type: POST_FORM_REQUESTED, data: values, res, rej });
          }).then((res) => {
            setTeams([...teams, ...res]);
          });
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
              {/* Now we can conditionally render the loading based on the form's state, instead of store's */}
              {isSubmitting ? (
                <Loading message="Hold your pants..." />
              ) : (
                "Save it!"
              )}
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
 * Finally, the binding between the saga's server waiting,
 * and the form's, is done via mounting and unmounting the `LoadingHandler` component
 * ie. I need two things to do one job
 */
export default connect((state) => state.forms)(Teams);
