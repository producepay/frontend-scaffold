import PropTypes from 'prop-types';

export const optionValueType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

export const optionType = PropTypes.arrayOf(optionValueType);
