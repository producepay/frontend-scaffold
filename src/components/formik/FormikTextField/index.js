import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Field } from 'formik';
import FormLabel from '../../elements/FormLabel';
import TextField from '../../elements/TextField';

function FormikTextField(props) {
  const { name, hasLabel, className, ...rest } = props;

  return (
    <Field
      name={name}
      render={({ field, form: { touched, errors } }) => (
        hasLabel ? (
          <FormLabel
            className={className}
            label={_.startCase(name)}
            error={touched[name] ? errors[name] : null}
          >
            <TextField {...field} {...rest} />
          </FormLabel>
        ) : (
          <TextField className={className} {...field} {...rest} />
        )
      )}
    />
  );
}

FormikTextField.propTypes = {
  ...TextField.propTypes,
  name: PropTypes.string.isRequired,
  hasLabel: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FormikTextField.defaultProps = {
  hasLabel: true,
};

export default React.memo(FormikTextField);
