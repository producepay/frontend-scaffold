import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';

import Button from '../../../components/elements/Button';
import Card from '../../../components/elements/Card';
import FormikTextField from '../../../components/formik/FormikTextField';

const SIGN_IN_SCHEMA = yup.object().shape({
  email: yup.string().email('is invalid').required('is required'),
  password: yup.string().min(8, 'must be at least 8 characters').required('is required'),
});

function SignInView({ login }) {
  return (
    <Card className='p-4 w-full sm:max-w-lg sm:mt-16 mx-auto'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SIGN_IN_SCHEMA}
        onSubmit={(values, { setSubmitting }) => {
          login(_.pick(values, ['email', 'password']))
          .catch((e) => {
            setSubmitting(false);
            console.log(e);
          })
        }}
        render={({ isSubmitting, errors }) => (
          <Form>
            {errors.general ? (
              <div className='mb-4 text-sm text-red-600 font-medium'>
                {errors.general}
              </div>
            ) : null}

            <FormikTextField className='mb-4' name='email' type='email' />
            <FormikTextField className='mb-4' name='password' type='password' />

            <Button type='submit' className='w-full' disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      />
    </Card>
  );
}

export default React.memo(SignInView);
