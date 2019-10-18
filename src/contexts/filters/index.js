import React, { useState, useReducer, useEffect, useContext, useCallback } from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import subISOYears from 'date-fns/sub_iso_years';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

import { useDidMount } from '../../hooks/did-mount';
import { useSessionStorage } from '../../hooks/use-session-storage';

import { collectionAsOptions, FILTER_CONTEXT_ACTION_TYPES } from './helpers';

const FETCH_FILTER_DATA = gql`
  query FetchFilterData($erpProductFilters: ErpProductFilterInput) {
    erpProducts: erpProducts(filters: $erpProductFilters) {
      commodityName
      commodityIdentifier
      varietyName
      varietyIdentifier
      packagingName
      packagingIdentifier
      sizeName
      sizeIdentifier
      gradeName
      gradeIdentifier
    }
    erpCustomers: erpCustomers {
      id
      name
    }
  }
`;

const graphqlFiltersReducer = (state, action) => {
  switch (action.type) {
    case FILTER_CONTEXT_ACTION_TYPES.COMMODITIES_AND_VARIETIES: {
      if (action.commodityVarietyIdentifiers.length === 0) {
        return state.commodityVarietyIdentifierPairs ?
          { ...state, commodityVarietyIdentifierPairs: [] } :
          { ...state, commodityIdentifier: [] };
      }
      const hasVarieties = _.flatten(_.map(action.commodityVarietyIdentifiers, 'subItems')).length !== 0;
      if (hasVarieties) {
        const cvPairs = _.flatten(
          _.map(action.commodityVarietyIdentifiers, (item) => (
            _.map(item.subItems, (subItem) => ({ commodityIdentifier: item.value, varietyIdentifier: subItem.value }))
          ))
        );
        return { ...state, commodityVarietyIdentifierPairs: cvPairs };
      } else {
        return setFilterState(state, 'commodityIdentifier', _.map(action.commodityVarietyIdentifiers, 'value'));
      }
    }
    case FILTER_CONTEXT_ACTION_TYPES.IN_COMMODITY_SCOPE: {
      return _.omit(state, ['commodityVarietyIdentifierPairs', 'commodityIdentifier']);
    }
    case FILTER_CONTEXT_ACTION_TYPES.IN_CUSTOMER_SCOPE: {
      return _.omit(state, 'erpCustomerId');
    }
    case FILTER_CONTEXT_ACTION_TYPES.SIZE:
      return setFilterState(state, 'sizeIdentifier', action.values);
    case FILTER_CONTEXT_ACTION_TYPES.PACKAGING:
      return setFilterState(state, 'packagingIdentifier', action.values);
    case FILTER_CONTEXT_ACTION_TYPES.CUSTOMER:
      return setFilterState(state, 'erpCustomerId', action.values);
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

function setFilterState(state, key, values) {
  if (values && values.length === 0) {
    return _.omit(state, key);
  }
  return { ...state, [key]: values }
}

function generateFilter(collection, title, key, label, dispatch, restoredValues) {
  const items = _.uniqBy(collectionAsOptions(collection, { key, label }), 'value');
  return {
    title,
    items,
    key,
    onChange: (items) => {
      const values = _.map(items, 'value');
      dispatch({ type: FILTER_CONTEXT_ACTION_TYPES[_.toUpper(title)], values });
    },
    defaultValues: restoredValues ?
      _.filter(items, (i) => _.includes(restoredValues, i.value) ) : [],
  };
}

function restoreDefaultCvOptions(restoredCommodityVarietyPairs, options) {
  return _.reduce(restoredCommodityVarietyPairs, (result, cvPair) => {
    const optionItem = _.find(options, item => item.value === cvPair.commodityIdentifier);
    if (optionItem) {
      const subItem = _.find(optionItem.subItems, subItem => subItem.value === cvPair.varietyIdentifier);
      const existingItemIdx = _.findIndex(result, i => i.value === optionItem.value);
      if (existingItemIdx > -1) {
        result[existingItemIdx].subItems.push(subItem);
      } else {
        result.push({
          value: optionItem.value,
          label: optionItem.label,
          subItems: [subItem],
        });
      }
    }
    return result;
  }, []);
}

const FiltersContext = React.createContext();

function FiltersProvider(props) {
  const { children } = props;
  const { customerId, commodityName } = props.match.params;

  const [filtersToRender, setFiltersToRender] = useState([]); // filters is a config array to be passed to the view for render
  const [commodityNameParam, setCommodityNameParam] = useState(commodityName);
  const [customerIdParam, setCustomerIdParam] = useState(customerId);

  const [state, dispatch] = useReducer(graphqlFiltersReducer, {
    startDate: subISOYears(new Date(), 1), // initial dates
    endDate: new Date(),
  });
  const [sessionFilters, setSessionFilters] = useSessionStorage('filters', state);

  const { data, loading } = useQuery(FETCH_FILTER_DATA, {
    variables: {
      erpProductFilters: {
        ...(commodityNameParam ? { commodityName: commodityNameParam } : {}),
      },
    },
  });

  const didMount = useDidMount();
  useEffect(() => {
    if (didMount) { // first render
      if (!_.isEmpty(sessionFilters)) {
        // Restore dates from date strings
        const transformSessionFilters = {
          ...sessionFilters,
          ...(sessionFilters.startDate ? { startDate: new Date(sessionFilters.startDate) } : {}),
          ...(sessionFilters.endDate ? { endDate: new Date(sessionFilters.endDate) } : {}),
        };
        if (!_.isEqual(transformSessionFilters, sessionFilters)) {
          dispatch({ type: FILTER_CONTEXT_ACTION_TYPES.RESTORE_FILTERS, filters: transformSessionFilters });
        }
      }
    }
  }, [didMount, sessionFilters]);

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

  useEffect(() => {
    if (data && data.erpProducts) {
      const currentFilters = [];
      if (!commodityNameParam) { // not in a commodity specific view
        const commoditiesWithSubVarieties =
          _.reduce(_.groupBy(data.erpProducts, 'commodityIdentifier'),
            (result, erpProducts, commodityIdentifier) => {
              result.push({
                value: commodityIdentifier,
                label: _.get(erpProducts, '[0].commodityName'),
                subItems: generateFilter(erpProducts, "Varieties", 'varietyIdentifier', 'varietyName', () => {}, []).items,
              });
              return result;
            }, []);
        const commodityValues = _.map(commoditiesWithSubVarieties, 'value');
        currentFilters.push({
          title: "Commodities",
          items: commoditiesWithSubVarieties,
          key: 'commodityIdentifier',
          onChange: (items) => {
            dispatch(
              { type: FILTER_CONTEXT_ACTION_TYPES.COMMODITIES_AND_VARIETIES, commodityVarietyIdentifiers: items }
            )},
          defaultValues: sessionFilters.commodityIdentifier ?
            _.filter(commoditiesWithSubVarieties, i => _.includes(commodityValues, i.value)) : 
            sessionFilters.commodityVarietyIdentifierPairs ?
              restoreDefaultCvOptions(sessionFilters.commodityVarietyIdentifierPairs, commoditiesWithSubVarieties) :
              [],
        });
      } else {
        // remove commodity variety identifier pairs here
        dispatch({ type: FILTER_CONTEXT_ACTION_TYPES.IN_COMMODITY_SCOPE });
      }
    
      // Size and Packaging
      currentFilters.push(generateFilter(data.erpProducts, "Size", "sizeIdentifier", "sizeName", dispatch, sessionFilters.sizeIdentifier));
      currentFilters.push(generateFilter(data.erpProducts, "Packaging", "packagingIdentifier", "packagingName", dispatch, sessionFilters.packagingIdentifier));

      if (!customerIdParam) { // not in a customer specific view
        currentFilters.push(generateFilter(data.erpCustomers, "Customer", "id", "name", dispatch, sessionFilters.erpCustomerId));
      } else {
        dispatch({ type: FILTER_CONTEXT_ACTION_TYPES.IN_CUSTOMER_SCOPE });
      }

      setFiltersToRender(currentFilters);
    }
  }, [commodityNameParam, customerId, customerIdParam, data, sessionFilters]);

  return (
    <FiltersContext.Provider value={{
      filters: filtersToRender,
      gqlFilterVariables: state,
      dispatch,
      loading,
      handleDateRangeSelected,
      setCommodityNameParam, // components using this context must set this on route change
      setCustomerIdParam,    // components using this context must set this on route change
      setSessionFilters,
    }}>
      {children}
    </FiltersContext.Provider> 
  );
}

function useFilters() {
  return useContext(FiltersContext);
}

export default withRouter(FiltersProvider);
const WrappedFiltersProvider = withRouter(FiltersProvider);

export {
  WrappedFiltersProvider as FiltersProvider,
  useFilters,
};
