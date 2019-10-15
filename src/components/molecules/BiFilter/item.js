import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { optionValueType } from '../../../helpers/types';
import Checkbox from '../../elements/Checkbox';

function BiFilterItem(props) {
  const {
    item,
    onClick,
    checked,
  } = props;

  return (
    <li className="my-1">
      <div className="flex items-center">
        <Checkbox
          className="mr-2"
          value={item.value}
          onClick={onClick}
          checked={checked}
        />
        <label htmlFor={item.value} className="text-sm cursor-pointer">{item.label}</label>
      </div>
    </li>
  );
}

BiFilterItem.propTypes = {
  item: optionValueType.isRequired,
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default React.memo(BiFilterItem);
