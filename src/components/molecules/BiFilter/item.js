import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { optionValueWithSubItemsType, optionsWithSubItemsType } from './helpers';
import { textSearchCompare } from '../../../helpers/common';
import Checkbox from '../../elements/Checkbox';
import ChevronUp from '../../icons/ChevronUp';
import ChevronDown from '../../icons/ChevronDown';

const CHEVRON_COLOR = "#a0aec0";

const ItemWithCheckbox = ({ item, onClick, checked, name }) => (
  <div className="flex items-center">
    <Checkbox
      className="mr-2"
      value={item.value}
      onClick={onClick}
      checked={checked}
      name={name}
    />
    <label htmlFor={name} className="text-sm cursor-pointer">{item.label}</label>
  </div>
)

function BiFilterItem(props) {
  const {
    className,
    item,
    selectedItems,
    onChange,
    searchTerm,
  } = props;

  const hasSubItems = item.subItems && item.subItems.length;
  const selectedItem = _.find(selectedItems, { value: item.value });
  const hasSubItemsSelected = hasSubItems && selectedItem && (selectedItem.subItems || []).length > 0;

  const [showSubItems, setShowSubItems] = useState(hasSubItemsSelected);

  useEffect(() => {
    setShowSubItems(hasSubItemsSelected);
  }, [setShowSubItems, hasSubItemsSelected])

  const filteredSubItems = textSearchCompare(searchTerm, item.label) ?
    item.subItems :
    _.filter(item.subItems, (subItem) => textSearchCompare(searchTerm, subItem.label));
  const hasSearchedSubItems = searchTerm !== '' && (filteredSubItems || []).length;

  useEffect(() => {
    if (hasSearchedSubItems) setShowSubItems(true);
  }, [hasSearchedSubItems, setShowSubItems]);

  const childItemValues = _.map(_.get(selectedItem, 'subItems'), 'value');

  return (
    <li className={cx("my-2", className)}>
      <div className="flex items-center justify-between">
        <ItemWithCheckbox
          item={item}
          onClick={() => onChange(item, null)}
          checked={_.includes(_.map(selectedItems, 'value'), item.value)}
          name={item.value}
        />
        {
          hasSubItems ? (
            <div className="cursor-pointer" onClick={() => setShowSubItems(!showSubItems)}>
              {
                showSubItems ?
                  <ChevronUp size={18} color={CHEVRON_COLOR} /> :
                  <ChevronDown size={18} color={CHEVRON_COLOR} />
              }
            </div>
          ) : null
        }
      </div>
      {
        hasSubItems && showSubItems ? (
          <ul className="pl-4">
            {_.map(filteredSubItems, (subItem) => (
              <li className="my-2" key={subItem.value}>
                <ItemWithCheckbox
                  item={subItem}
                  name={`${item.value}-${subItem.value}`}
                  onClick={() => onChange(item, subItem)}
                  checked={_.includes(childItemValues, subItem.value)}
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
  className: PropTypes.string,
  item: optionValueWithSubItemsType.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedItems: optionsWithSubItemsType.isRequired,
};

BiFilterItem.defaultProps = {
  className: '',
}

export default React.memo(BiFilterItem);
