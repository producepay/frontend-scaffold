import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './checkbox.css';

function Checkbox(props) {
  const { className, value, size } = props;

  const wrapperClassName = cx(
    'checkbox-wrapper block relative cursor-pointer',
    {
      'checkbox-size-small': size === 'small',
      'checkbox-size-large': size === 'large',
    },
    className,
  );

  const checkboxSpanClassName = cx(
    'checkbox-span',
    {
      'checkbox-size-small': size === 'small',
      'checkbox-size-large': size === 'large',
    },
  );

  return (
    <label className={wrapperClassName}>
      <input type="checkbox" value={value} className="absolute cursor-pointer opacity-0" />
      <span className={checkboxSpanClassName}></span>
    </label>
  );
}

Checkbox.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Checkbox.defaultProps = {
  className: '',
  size: 'small',
};

export default React.memo(Checkbox);
