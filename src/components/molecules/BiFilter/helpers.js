import PropTypes from 'prop-types';

export const FILTER_ACTION_TYPES = {
  ADD_PARENT: 'ADD_PARENT',
  REMOVE_PARENT: 'REMOVE_PARENT',
  ADD_CHILD: 'ADD_CHILD',
  REMOVE_CHILD: 'REMOVE_CHILD',
};

export const valueDef = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

const optionValueDef = {
  label: PropTypes.string.isRequired,
  value: valueDef.isRequired,
};

export const optionValueType = PropTypes.shape({...optionValueDef});

export const optionValueWithSubItemsType = PropTypes.shape({
  ...optionValueDef,
  subItems: PropTypes.arrayOf(optionValueType),
})

export const optionsWithSubItemsType = PropTypes.arrayOf(optionValueWithSubItemsType);
