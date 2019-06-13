import React from 'react';
import PropTypes from 'prop-types';

const SvgChevronDown = props => {
  const { color, size, ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
};

SvgChevronDown.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SvgChevronDown.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default SvgChevronDown;
