import React from 'react';
import PropTypes from 'prop-types';

const SvgCancel = props => {
  const { color, size, ...otherProps } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 12 12" fill="none" {...otherProps}>
      <line x1="1" y1="11" x2="11" y2="1" stroke={color} strokeWidth="2" />
      <line x1="1" y1="1" x2="11" y2="11" stroke={color} strokeWidth="2" />
    </svg>
  );
};

SvgCancel.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SvgCancel.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default SvgCancel;
