import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { optionValueWithSubItemsType } from '../../../helpers/types';
import { textSearchCompare } from '../../../helpers/common';
import Checkbox from '../../elements/Checkbox';
import ChevronUp from '../../icons/ChevronUp';
import ChevronDown from '../../icons/ChevronDown';
import { onItemClicked } from './index';

const CHEVRON_COLOR = "#a0aec0";

const ItemWithCheckbox = ({ item, onClick, checked }) => (
  <div className="flex items-center">
    <Checkbox
      className="mr-2"
      value={item.value}
      onClick={onClick}
      checked={checked}
    />
    <label htmlFor={item.value} className="text-sm cursor-pointer">{item.label}</label>
  </div>
)

function BiFilterItem(props) {
  const {
    item,
    onClick,
    checked,
    onSubItemClicked,
    selectAll,
    searchTerm,
    
  } = props;

  const hasSubItems = item.subItems && item.subItems.length;

  const [showSubItems, setShowSubItems] = useState(false);
  const [selectedSubItems, setSelectedSubItems] = useState(selectAll && hasSubItems ? _.map(item.subItems, 'value') : []);

  useEffect(() => {
    if (searchTerm !== '' && _.some(item.subItems, (subItem) => textSearchCompare(searchTerm, subItem.label))) {
      setShowSubItems(true);
    }
  }, [setShowSubItems, searchTerm, item.subItems]);

  const filteredSubItems = _.filter(item.subItems, (subItem) => textSearchCompare(searchTerm, subItem.label));

  return (
    <li className="my-1">
      <div className="flex items-center justify-between">
        <ItemWithCheckbox
          item={item}
          onClick={onClick}
          checked={checked}
        />
        {
          hasSubItems ? (
            <div className="cursor-pointer" onClick={() => setShowSubItems(!showSubItems)}>
              {showSubItems ? <ChevronUp size={18} color={CHEVRON_COLOR} /> : <ChevronDown size={18} color={CHEVRON_COLOR} />}
            </div>
          ) : null
        }
      </div>
      {
        hasSubItems && showSubItems ? (
          <ul className="pl-4">
            {_.map(filteredSubItems, (subItem) => (
              <li className="my-1" key={subItem.value}>
                <ItemWithCheckbox
                  item={subItem}
                  onClick={(e) => {
                    const values = onItemClicked(e.target.value, selectedSubItems, setSelectedSubItems);
                    onSubItemClicked({ [item.value]: values });
                  }}
                  checked={_.includes(selectedSubItems, subItem.value)}
                />
              </li>
            ))}
          </ul>
        ) : null
      }
    </li>
  );
}

BiFilterItem.propTypes = {
  item: optionValueWithSubItemsType.isRequired,
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  onSubItemClicked: PropTypes.func,
  selectAll: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

BiFilterItem.defaultProps = {
  onSubItemClicked: () => {},
}

export default React.memo(BiFilterItem);
