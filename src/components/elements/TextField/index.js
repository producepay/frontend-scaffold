import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './text-field.css';

function TextField(props) {
  const { className, innerRef, type, size, rounded, ...rest } = props;

  const computedClassName = cx(
    className,
    `textfield w-full border outline-none focus:border-blue-400 textfield-${size} text-${size}`,
    {
      rounded: rounded,
    }
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
  size: PropTypes.oneOf(['sm', 'base']),
  rounded: PropTypes.bool,
};

TextField.defaultProps = {
  type: 'text',
  innerRef: null,
  size: 'base',
  rounded: true,
};

export default React.memo(TextField);
