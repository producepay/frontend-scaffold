import PropTypes from 'prop-types';

export const valueDef = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

const optionValueDef = {
  label: PropTypes.string,
  value: valueDef,
};

export const optionValueType = PropTypes.shape({ ...optionValueDef });

export const optionValueWithSubItemsType = PropTypes.shape({
  ...optionValueDef,
  subItems: PropTypes.arrayOf(optionValueType),
})

export const optionsWithSubItemsType = PropTypes.arrayOf(optionValueWithSubItemsType);
