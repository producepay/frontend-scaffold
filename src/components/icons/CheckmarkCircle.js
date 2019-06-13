import React from 'react';
import PropTypes from 'prop-types';

const SvgCheckmarkCircle = props => {
  const { color, size, ...otherProps } = props;

  return (
    <svg width={size} height={size} viewBox='0 0 15 15' fill='none' {...otherProps}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z'
        fill={color}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.938 8.97L4.141 7.175l-.611.607 2.408 2.41 5.171-5.172-.608-.607L5.938 8.97z'
        fill='#FFF'
      />
    </svg>
  );
}

SvgCheckmarkCircle.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SvgCheckmarkCircle.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default SvgCheckmarkCircle;
