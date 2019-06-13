import React from "react";
import PropTypes from 'prop-types';

const SvgDownArrow = props => {
  const { color, size, ...otherProps } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 11 11"
      fill="none"
      {...otherProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 5.07h3.143V.5h4.714v4.57H11L5.5 10.4 0 5.07z"
        fill={color}
      />
    </svg>
  );
}

SvgDownArrow.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SvgDownArrow.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default SvgDownArrow;
