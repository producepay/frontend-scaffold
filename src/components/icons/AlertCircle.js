import React from 'react';
import PropTypes from 'prop-types';

const SvgAlertCircle = props => {
  const { size, color, ...otherProps } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 19 19" fill="none" {...otherProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 0C4.256 0 0 4.256 0 9.5S4.256 19 9.5 19 19 14.744 19 9.5 14.744 0 9.5 0zm.95 14.25h-1.9v-1.9h1.9v1.9zm0-3.8h-1.9v-5.7h1.9v5.7z"
        fill={color}
      />
    </svg>
  );
}

SvgAlertCircle.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SvgAlertCircle.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default SvgAlertCircle;
