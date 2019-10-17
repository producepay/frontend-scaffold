import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { optionValueWithSubItemsType, FILTER_ACTION_TYPES } from './helpers';
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
    item,
    filterState,
    dispatch,
    searchTerm,
  } = props;

  const hasSubItems = item.subItems && item.subItems.length;

  const [showSubItems, setShowSubItems] = useState(false);

  useEffect(() => {
    if (searchTerm !== '' && _.some(item.subItems, (subItem) => textSearchCompare(searchTerm, subItem.label))) {
      setShowSubItems(true);
    }
  }, [setShowSubItems, searchTerm, item.subItems]);

  const filteredSubItems = _.filter(item.subItems, (subItem) =>
    textSearchCompare(searchTerm, item.label) || textSearchCompare(searchTerm, subItem.label)
  );
  const parentItems = _.keys(filterState);

  const onParentItemClicked = useCallback((e) => {
    if (_.includes(parentItems, e.target.value)) {
      dispatch({ type: FILTER_ACTION_TYPES.REMOVE_PARENT, parentValue: e.target.value });
    } else {
      dispatch({ type: FILTER_ACTION_TYPES.ADD_PARENT, parentValue: e.target.value, children: _.map(filteredSubItems, 'value') });
    }
  }, [parentItems, dispatch, filteredSubItems]);

  const onChildItemClicked = useCallback((e) => {
    const childItems = filterState[item.value];
    if (_.includes(childItems, e.target.value)) {
      dispatch({ type: FILTER_ACTION_TYPES.REMOVE_CHILD, parentValue: item.value, childValue: e.target.value })
    } else {
      dispatch({ type: FILTER_ACTION_TYPES.ADD_CHILD, parentValue: item.value, childValue: e.target.value });
    }
  }, [dispatch, filterState, item.value]);

  return (
    <li className="my-2">
      <div className="flex items-center justify-between">
        <ItemWithCheckbox
          item={item}
          onClick={onParentItemClicked}
          checked={_.includes(parentItems, item.value)}
          name={item.value}
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
              <li className="my-2" key={subItem.value}>
                <ItemWithCheckbox
                  item={subItem}
                  name={`${item.value}-${subItem.value}`}
                  onClick={onChildItemClicked}
                  checked={_.includes(filterState[item.value], subItem.value)}
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
  searchTerm: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  filterState: PropTypes.object.isRequired,
};

BiFilterItem.defaultProps = {
  onSubItemClicked: () => {},
}

export default React.memo(BiFilterItem);
