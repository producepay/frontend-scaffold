import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';

import { optionsWithSubItemsType } from '../../../helpers/types';
import { textSearchCompare } from '../../../helpers/common';
import TextField from '../../elements/TextField';
import Button from '../../elements/Button';
import PlusIcon from '../../icons/Plus';
import MinusIcon from '../../icons/Minus';

import BiFilterItem from './item';

const ICON_COLOR = "#a0aec0";

export function onItemClicked(value, selectedItems, setSelectedItems) {
  let values = [];
  if (_.includes(selectedItems, value)) {
    values = _.without(selectedItems, value);
  } else {
    values = _.concat(selectedItems, value);
  }
  setSelectedItems(values);
  return values;
}

function BiFilter(props) {
  const {
    title,
    className,
    items,
    limit,
    onChange,
    onSubItemsChange,
    selectAll,
    showSearch,
  } = props;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [selected, setSelected] = useState(selectAll ? _.map(items, 'value') : []);

  const wrapperClassName = cx(
    "w-full",
    className,
  );

  const filteredItems = _.filter(items,
    (option) => textSearchCompare(searchTerm, option.label) || _.some(
      _.get(option, 'subItems', []),
      (subItem) => textSearchCompare(searchTerm, subItem.label)
    )
  );
  const finalItems = showMore ? filteredItems : _.take(filteredItems, limit);

  return (
    <div className={wrapperClassName}>
      <div className="flex justify-between items-center">
        <div className="font-medium">{title}</div>
        <div className="cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <PlusIcon size={14} color={ICON_COLOR} /> : <MinusIcon size={14} color={ICON_COLOR} />}
        </div>
      </div>
      {
        isCollapsed ? null : (
          <div>
            {showSearch && (
              <TextField
                className="my-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                size="sm"
                rounded={false}
              />
            )}
            <ul>
              {finalItems.map(item => (
                <BiFilterItem
                  key={item.value}
                  item={item}
                  onClick={(e) => {
                    const values = onItemClicked(e.target.value, selected, setSelected);
                    onChange(values);
                  }}
                  searchTerm={searchTerm}
                  checked={_.includes(selected, item.value)}
                  onSubItemClicked={onSubItemsChange}
                  selectAll
                />
              ))}
            </ul>
            {
              filteredItems.length > limit ? (
                <Button
                  onClick={() => setShowMore(!showMore)}
                  variant="text"
                  label={showMore ? "Show Less" : "Show More"}
                  className="text-xs font-medium"
                />
              ) : null
            }
          </div>
        )
      }
    </div>
  );
}

BiFilter.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  items: optionsWithSubItemsType.isRequired,
  showSearch: PropTypes.bool,
  limit: PropTypes.number,
  onChange: PropTypes.func,
  onSubItemsChange: PropTypes.func,
  selectAll: PropTypes.bool,
};

BiFilter.defaultProps = {
  className: '',
  showSearch: true,
  limit: 5,
  onChange: () => {},
  onSubItemsChange: () => {},
  selectAll: false,
};

export default React.memo(BiFilter);
