import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { useDidMount } from '../../../hooks/did-mount';

import { optionsWithSubItemsType, FILTER_ACTION_TYPES } from './helpers';
import BiFilterView from './view';

const biFilterReducer = (state, action) => {
  switch (action.type) {
    case FILTER_ACTION_TYPES.ADD_PARENT:
      return { ...state, [action.parentValue]: action.children };
    case FILTER_ACTION_TYPES.REMOVE_PARENT: {
      return _.omit(state, action.parentValue);
    }
    case FILTER_ACTION_TYPES.ADD_CHILD:
      if (_.has(state, action.parentValue)) {
        return { ...state, [action.parentValue]: [...state[action.parentValue], action.childValue] };
      } else {
        return { ...state, [action.parentValue]: [action.childValue] };
      }
    case FILTER_ACTION_TYPES.REMOVE_CHILD:
      const childItems = _.without(state[action.parentValue], action.childValue);
      if (childItems.length) {
        return { ...state, [action.parentValue]: childItems };
      } else {
        return _.omit(state, action.parentValue);
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

  const didMount = useDidMount();

  const defaultState = selectAll ? _.reduce(_.keyBy(items, 'value'),
    (result, item, parentValue) => {
      result[parentValue] = _.get(item, 'subItems', []).length > 0 ? _.map(item.subItems, 'value') : [];
      return result;
    },
  {}) : {};
  const [state, dispatch] = useReducer(biFilterReducer, defaultState);

  useEffect(() => {
    if (!didMount) {
      onChange(state);
    }
  }, [state, onChange, didMount]);

  return (
    <BiFilterView
      className={className}
      title={title}
      items={items}
      showSearch={showSearch}
      limit={limit}
      dispatch={dispatch}
      state={state}
      selectAll
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
