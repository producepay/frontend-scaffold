import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const signInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password is too short!').required('Required'),
});

const SignInForm = ({ handleSubmit }) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={signInSchema}
    onSubmit={handleSubmit}
  >
    {({ isSubmitting }) => (
      <Form>
        <div className='p-4'>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div className='p-4'>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />
        </div>
        <div className='p-4'>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </Form>
    )}
  </Formik>
);

export default SignInForm;