import React from 'react';
import PropTypes from 'prop-types';

const SvgMinus = props => {
  const { color, size, ...otherProps } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} 2`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M14 2H0V0H14V2Z" fill={color} />
    </svg>
  );
};

SvgMinus.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SvgMinus.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default SvgMinus;
