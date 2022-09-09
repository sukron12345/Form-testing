import debounce from "lodash/debounce";
import React from "react";
import { withFormik } from "formik";
import Input from "../../components/Input";
import DisplayFormikState from "../../components/DisplayFormState";
import { resetMessage, setMessage } from "../../actions/message";
import store from "../../store";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    tgl_lahir: Yup.string().required("Date of Birth is required!"),
    address: Yup.string().required("address is required!"),
    phone_number: Yup.string().required("phone_number is required!"),
    password: Yup.string().required("password is required!"),
  }),
  mapPropsToValues: props => ({
    name: "",
    email: "",
    tgl_lahir: "",
    address: "",
    phone_number: "",
    password: "",
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values
    };

    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "MyForm"
});

const handleFormReset = handleReset => {
  store.dispatch(resetMessage());
  handleReset();
};

const validateField = debounce(
  ({ errors, value }) =>
    !errors && value
      ? store.dispatch(setMessage())
      : store.dispatch(resetMessage()),
  500
);

const MyForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    isSubmitting
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="name"
        label="Full Name"
        type="text"
        placeholder="Your Name."
        errors={errors.name}
        value={values.name}
        touched={touched.name}
        onChange={handleChange}
        onBlur={handleBlur}
        validateField={validateField}
      />
      <Input
        name="email"
        label="Email Address"
        type="email"
        placeholder="Enter an email address."
        errors={errors.email}
        value={values.email}
        touched={touched.email}
        onChange={handleChange}
        onBlur={handleBlur}
        validateField={validateField}
      />
      <Input
        name="tgl_lahir"
        label="Date of Birth"
        type="date"
        errors={errors.tgl_lahir}
        value={values.tgl_lahir}
        touched={touched.tgl_lahir}
        onChange={handleChange}
        onBlur={handleBlur}
        validateField={validateField}
      />
      <Input
        name="address"
        label="Address"
        type="text"
        placeholder="Sreet address."
        errors={errors.address}
        value={values.address}
        touched={touched.address}
        onChange={handleChange}
        onBlur={handleBlur}
        validateField={validateField}
      />
      <Input
        name="phone_number"
        label="Phone Number"
        type="text"
        placeholder="e.g 858 888 999"
        errors={errors.phone_number}
        value={values.phone_number}
        touched={touched.phone_number}
        onChange={handleChange}
        onBlur={handleBlur}
        validateField={validateField}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        placeholder="******"
        errors={errors.password}
        value={values.password}
        touched={touched.password}
        onChange={handleChange}
        onBlur={handleBlur}
        validateField={validateField}
      />
      <button
        type="button"
        className="outline"
        onClick={() => handleFormReset(handleReset)}
        disabled={!dirty || isSubmitting}
      >
        Cancel
      </button>
      <button classname="bg-red" type="submit" disabled={isSubmitting}>
        Submit
      </button>

      <DisplayFormikState {...props} />
    </form>
  );
};

export default formikEnhancer(MyForm);
