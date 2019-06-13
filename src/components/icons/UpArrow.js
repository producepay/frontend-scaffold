import React from "react";
import PropTypes from 'prop-types';

const SvgUpArrow = props => {
  const { color, size, ...otherProps } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 11 10" fill="none" {...otherProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 5.43H7.857V10H3.143V5.43H0L5.5.1 11 5.43z"
        fill={color}
      />
    </svg>
  );
}

SvgUpArrow.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SvgUpArrow.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default SvgUpArrow;
