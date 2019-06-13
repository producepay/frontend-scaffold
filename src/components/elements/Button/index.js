import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './button.css';

function Button(props) {
  const { className, variant, color, label, children, ...rest } = props;

  const computedClassName = cx(className, 'button no-underline', {
    'py-2 px-4 rounded': ['solid', 'outlined'].includes(variant),
    'text-grey-lightest bg-primary': color === 'primary' && variant === 'solid',
    'bg-grey-light text-grey-darkest': color === 'secondary' && variant === 'solid',
    'text-primary': color === 'primary' && ['outlined', 'icon', 'text'].includes(variant),
    'text-grey-darkest': color === 'secondary' && ['outlined', 'icon', 'text'].includes(variant),
    'bg-white border': variant === 'outlined',
    'border-primary': color === 'primary' && variant === 'outlined',
    'border-grey-darkest': color === 'secondary' && variant === 'outlined',
    'border-none': variant === 'text',
    'h-10 w-10 rounded-full inline-flex justify-center items-center': variant === 'icon',
  });

  return (
    <button className={computedClassName} {...rest}>
      {label || children}
    </button>
  );
}

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
