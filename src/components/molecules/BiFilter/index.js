import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { useDidMount } from '../../../hooks/did-mount';

import { optionsWithSubItemsType, FILTER_ACTION_TYPES } from './helpers';
import BiFilterView from './view';

const biFilterReducer = (state, action) => {
  switch (action.type) {
    case FILTER_ACTION_TYPES.ADD_ITEM: {
      return [ ...state, action.item ];
    }
    case FILTER_ACTION_TYPES.REMOVE_ITEM: {
      return _.filter(state, (item) => item.value !== action.item.value);
    }
    case FILTER_ACTION_TYPES.ADD_SUB_ITEM: {
      const parentItem = _.find(state, (item) => item.value === action.item.value);
      const newParentItem = { ...parentItem, subItems: [...parentItem.subItems, action.subItem ] }
      return [..._.filter(state, (item) => item.value !== parentItem.value), newParentItem];
    }
    case FILTER_ACTION_TYPES.REMOVE_SUB_ITEM: {
      const parentItem = _.find(state, (item) => item.value === action.item.value);
      const newParentItem = {
        ...parentItem,
        subItems: _.filter(parentItem.subItems, (subItem) => subItem.value !== action.subItem.value)
      };
      return [..._.filter(state, (item) => item.value !== parentItem.value), newParentItem];
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
    showSearch,
    defaultValues,
  } = props;

  const didMount = useDidMount();

  const [state, dispatch] = useReducer(biFilterReducer, defaultValues);

  useEffect(() => {
    if (!didMount) {
      onChange(state);
    }
  }, [didMount, onChange, state]);

  return (
    <BiFilterView
      className={className}
      title={title}
      items={items}
      showSearch={showSearch}
      limit={limit}
      dispatch={dispatch}
      state={state}
    />
  );
}

BiFilter.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  items: optionsWithSubItemsType.isRequired,
  showSearch: PropTypes.bool,
  limit: PropTypes.number,
  onChange: PropTypes.func,
  defaultValues: optionsWithSubItemsType,
};

BiFilter.defaultProps = {
  className: '',
  showSearch: true,
  limit: 5,
  onChange: () => {},
  defaultValues: [],
};

export default React.memo(BiFilter);
