import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './text-field.css';

function TextField(props) {
  const { className, innerRef, type, ...rest } = props;

  const computedClassName = cx(
    className,
    'textfield w-full border rounded outline-none focus:border-blue-400',
  );

  const inputProps = { className: computedClassName, ...rest };
  if (innerRef) inputProps.ref = innerRef;

  return type === 'textarea' ?
    <textarea {...inputProps} /> :
    <input type={type} {...inputProps} />;
}

TextField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  innerRef: PropTypes.object,
};

TextField.defaultProps = {
  type: 'text',
  innerRef: null,
};

export default React.memo(TextField);
