import PropTypes from 'prop-types';

const optionValueDef = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const optionValueType = PropTypes.shape({...optionValueDef});

export const optionValueWithSubItemsType = PropTypes.shape({
  ...optionValueDef,
  subItems: PropTypes.arrayOf(optionValueType),
})

export const optionsWithSubItemsType = PropTypes.arrayOf(optionValueWithSubItemsType);
