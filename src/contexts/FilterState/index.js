import React, { useReducer, useEffect, useContext, useCallback } from 'react';
import _ from 'lodash';
import subISOYears from 'date-fns/sub_iso_years';

import { useSessionStorage } from '../../hooks/use-session-storage';

import { FILTER_CONTEXT_ACTION_TYPES } from './helpers';

const graphqlFiltersReducer = (state, action) => {
  switch (action.type) {
    case FILTER_CONTEXT_ACTION_TYPES.COMMODITIES_AND_VARIETIES: {
      return setFilterState(state, 'commodityVarietyIdentifierPairs', action.item, action.subItem);
    }
    case FILTER_CONTEXT_ACTION_TYPES.SIZE:
      return setFilterState(state, 'sizeIdentifier', action.item, action.subItem);
    case FILTER_CONTEXT_ACTION_TYPES.PACKAGING:
      return setFilterState(state, 'packagingIdentifier', action.item, action.subItem);
    case FILTER_CONTEXT_ACTION_TYPES.CUSTOMER:
      return setFilterState(state, 'erpCustomerId', action.item, action.subItem);
    case FILTER_CONTEXT_ACTION_TYPES.DATE_RANGE: {
      return { ...state, startDate: action.startDate, endDate: action.endDate };
    }
    case FILTER_CONTEXT_ACTION_TYPES.RESTORE_FILTERS: {
      return action.filters;
    }
    default: {
      throw new Error();
    }
  }
};

function setFilterState(state, key, item, subItem) {
  const filters = state[key] || [];
  const parentItem = _.find(filters, i => i.value === item.value);
  if (subItem) { // if child item clicked
    if (parentItem) {
      const existingChild = _.find(parentItem.subItems, i => i.value === subItem.value);
      if (existingChild) {
        if (parentItem.subItems.length === 1) { // remove parent as well
          return { ...state, [key]: _.filter(filters, i => i.value !== item.value) }
        } else { // remove subitem only
          const newParentItem = {
            ...parentItem,
            subItems: _.filter(parentItem.subItems, (child) => child.value !== subItem.value)
          };
          return { ...state, [key]: [..._.filter(filters, i => i.value !== parentItem.value), newParentItem] }
        }
      } else { // add subitem
        const newParentItem = { ...parentItem, subItems: [...parentItem.subItems, subItem ] };
        return { ...state, [key]: [..._.filter(filters, i => i.value !== parentItem.value), newParentItem] };
      }
    } else { // add parent with subitem
      const newParentItem = { ...item, subItems: [subItem] };
      return { ...state, [key]: [ ...filters, newParentItem ] };
    }
  } else { // parent item clicked
    if (parentItem) { // need to remove parent item
      return { ...state, [key]: _.filter(filters, i => i.value !== item.value) };
    } else { // add parent item
      return { ...state, [key]: [ ...filters, item ] };
    }
  }
}

const FilterStateContext = React.createContext();

function FilterStateProvider(props) {
  const { children } = props;

  const [sessionFilters, setSessionFilters] = useSessionStorage('filters', {});
  const [state, dispatch] = useReducer(graphqlFiltersReducer, {
    ...sessionFilters,
    ...{ startDate: sessionFilters.startDate ? new Date(sessionFilters.startDate) : subISOYears(new Date(), 1) },
    ...{ endDate: sessionFilters.endDate ? new Date(sessionFilters.endDate) : new Date() },
  });

  useEffect(() => {
    setSessionFilters(state);
  }, [state, setSessionFilters]);

  const handleDateRangeSelected = useCallback((from, to) => {
    dispatch({
      type: FILTER_CONTEXT_ACTION_TYPES.DATE_RANGE,
      startDate: from,
      endDate: to,
    });
  }, [dispatch]);

  const transFormFiltersToGqlVariables = useCallback(() => {
    const { commodityVarietyIdentifierPairs, startDate, endDate, ...otherFilters } = state;
    return {
      startDate,
      endDate,
      ..._.omitBy(
        _.mapValues(otherFilters, (items) => _.map(items, 'value')),
        values => values.length === 0,
      ),
      ...(commodityVarietyIdentifierPairs && commodityVarietyIdentifierPairs.length ? {
        commodityVarietyIdentifierPairs: 
          _.flatten(
            _.map(state.commodityVarietyIdentifierPairs, (item) => (
              item.subItems && item.subItems.length ? 
                _.map(item.subItems, (subItem) =>
                  ({ commodityIdentifier: item.value, varietyIdentifier: subItem.value })) :
                { commodityIdentifier: item.value, varietyIdentifier: null }
            ))
          )
      } : {}),
    }
  }, [state]);

  return (
    <FilterStateContext.Provider value={{
      gqlFilterVariables: transFormFiltersToGqlVariables(state),
      filterValues: state,
      dispatch,
      handleDateRangeSelected,
      setSessionFilters, // used to clear state when logging out
    }}>
      {children}
    </FilterStateContext.Provider> 
  );
}

function useFilterState() {
  return useContext(FilterStateContext);
}

const WrappedFilterStateProvider = React.memo(FilterStateProvider);

export {
  WrappedFilterStateProvider as FilterStateProvider,
  useFilterState,
};
