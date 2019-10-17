import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';

import { optionsWithSubItemsType, FILTER_ACTION_TYPES } from './helpers';
import { textSearchCompare } from '../../../helpers/common';
import TextField from '../../elements/TextField';
import Button from '../../elements/Button';
import PlusIcon from '../../icons/Plus';
import MinusIcon from '../../icons/Minus';

import BiFilterItem from './item';

const ICON_COLOR = "#a0aec0";

const biFilterReducer = (state, action) => {
  switch (action.type) {
    case FILTER_ACTION_TYPES.ADD_PARENT:
      const newState = { ...state, [action.parentValue]: action.children };
      action.onChange(newState);
      return newState;
    case FILTER_ACTION_TYPES.REMOVE_PARENT: {
      const newState = _.omit(state, action.parentValue);
      action.onChange(newState);
      return newState;
    }
    case FILTER_ACTION_TYPES.ADD_CHILD:
      if (_.has(state, action.parentValue)) {
        const newState = { ...state, [action.parentValue]: [...state[action.parentValue], action.childValue] };
        action.onChange(newState);
        return newState;
      } else {
        const newState = { ...state, [action.parentValue]: [action.childValue] }
        action.onChange(newState);
        return newState;
      }
    case FILTER_ACTION_TYPES.REMOVE_CHILD:
      const childItems = _.without(state[action.parentValue], action.childValue);
      if (childItems.length) {
        const newState = { ...state, [action.parentValue]: childItems };
        action.onChange(newState);
        return newState;
      } else {
        const newState = _.omit(state, action.parentValue); // uncheck parent item if no children selected
        action.onChange(newState);
        return newState;
      }
    default:
      throw new Error();
  }
};

function BiFilter(props) {
  const {
    title,
    className,
    items,
    limit,
    onChange,
    selectAll,
    showSearch,
  } = props;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMore, setShowMore] = useState(false);

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

  const defaultState = selectAll ? _.reduce(_.keyBy(finalItems, 'value'),
    (result, item, parentValue) => {
      result[parentValue] = _.get(item, 'subItems', []).length > 0 ? _.map(item.subItems, 'value') : [];
      return result;
    },
  {}) : {};
  const [state, dispatch] = useReducer(biFilterReducer, defaultState);

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
                  searchTerm={searchTerm}
                  dispatch={dispatch}
                  filterState={state}
                  onChange={onChange}
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
  selectAll: PropTypes.bool,
};

BiFilter.defaultProps = {
  className: '',
  showSearch: true,
  limit: 5,
  onChange: () => {},
  selectAll: false,
};

export default React.memo(BiFilter);
