import React from 'react';
import PropTypes from 'prop-types';

const SvgChevronUp = props => {
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
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
};

SvgChevronUp.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SvgChevronUp.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default SvgChevronUp;
