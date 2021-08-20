import * as Yup from "yup";

export const formikConfig = {
  initialValues: { name: "jimmy" },
  validateOnBlur: true, //default value already
  // validateOnChange: false,
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .test(
        "is-jimmy",
        "${value} is not Jimmy", // eslint-disable-line no-template-curly-in-string
        (value, context) => value === "jimmy"
      )
      .required("Required field")
  })
};
