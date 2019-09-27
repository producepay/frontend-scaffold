import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

const signInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password is too short!').required('Required'),
});

const SignInForm = ({ login }) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={signInSchema}
    onSubmit={(values, { setErrors }) => {
      login(_.pick(values, ['email', 'password']))
      .catch((e) => {
        setErrors({ general: 'Invalid email or password' })
      });
    }}
  >
    {({ isSubmitting, errors }) => (
      <Form>
        {errors.general ? (
          <div className='mb-4 text-sm text-red-600 font-medium'>
            {errors.general}
          </div>
        ) : null}

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
