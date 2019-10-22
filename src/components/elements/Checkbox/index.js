import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './checkbox.css';

function Checkbox(props) {
  const { className, value, name, size, onClick, checked } = props;

  const wrapperClassName = cx(
    'checkbox-wrapper block relative cursor-pointer',
    {
      'checkbox-size-small': size === 'small',
      'checkbox-size-large': size === 'large',
    },
    className,
  );

  const checkboxSpanClassName = cx(
    'checkbox-span absolute top-0 left-0 bg-transparent rounded-sm border-gray-400 border',
    {
      'checkbox-size-small': size === 'small',
      'checkbox-size-large': size === 'large',
    },
  );

  return (
    <label className={wrapperClassName} htmlFor={name || value}>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onClick}
        className="absolute cursor-pointer opacity-0"
        id={name || value}
      />
      <span className={checkboxSpanClassName}></span>
    </label>
  );
}

Checkbox.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string,
};

Checkbox.defaultProps = {
  className: '',
  size: 'small',
  name: null,
};

export default React.memo(Checkbox);
