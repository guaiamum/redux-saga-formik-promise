import * as Yup from "yup";

export const formikConfig = {
  initialValues: { name: "jimmy" },
  validateOnBlur: true, //default value already
  // validateOnChange: false,
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .test(
        "is-jimmy",
        "${value} is not 5 chars", // eslint-disable-line no-template-curly-in-string
        (value, context) => value.length === 5
      )
      .required("Required field")
  })
};
