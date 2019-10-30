import React from "react";
import PropTypes from 'prop-types';

function SvgChevronLeft(props) {
  const { color, size, ...otherProps } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 14 22" fill="none" {...otherProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.41 2.552L10.858 0 0 10.858l10.858 10.859 2.552-2.552-8.288-8.307 8.288-8.306z"
        fill={color}
      />
    </svg>
  );
}

SvgChevronLeft.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SvgChevronLeft.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default SvgChevronLeft;
