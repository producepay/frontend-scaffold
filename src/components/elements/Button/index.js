import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './button.css';

const Button = React.forwardRef((props, ref) => {
  const { className, variant, color, label, children, disabled, ...rest } = props;

  const computedClassName = cx(className, 'button no-underline rounded-full', {
    'py-2 px-4': ['solid', 'outlined'].includes(variant),
    'text-gray-100 bg-primary': color === 'primary' && variant === 'solid',
    'bg-gray-400 text-gray-800': color === 'secondary' && variant === 'solid',
    'text-primary': color === 'primary' && ['outlined', 'icon', 'text'].includes(variant),
    'text-gray-800': color === 'secondary' && ['outlined', 'icon', 'text'].includes(variant),
    'bg-white border': variant === 'outlined',
    'border-primary': color === 'primary' && variant === 'outlined',
    'border-gray-800': color === 'secondary' && variant === 'outlined',
    'border-none': variant === 'text',
    'h-10 w-10 rounded-full inline-flex justify-center items-center': variant === 'icon',
    'opacity-75': disabled,
  });

  return (
    <button ref={ref} className={computedClassName} disabled={disabled} {...rest}>
      {label || children}
    </button>
  );
});

Button.propTypes = {
  variant: PropTypes.oneOf(['solid', 'outlined', 'icon', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary']),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
};

Button.defaultProps = {
  color: 'primary',
  variant: 'solid',
  label: '',
  children: null,
};

export default React.memo(Button);
