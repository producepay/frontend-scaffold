import React, { useState, useReducer, useEffect, useContext, useCallback } from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import subISOYears from 'date-fns/sub_iso_years';
import startOfYear from 'date-fns/start_of_year';
import endOfYear from 'date-fns/end_of_year';
import setYear from 'date-fns/set_year';
import getYear from 'date-fns/get_year';
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
      const hasVarieties = _.flatten(_.values(action.commodityVarietyIdentifiers)).length !== 0;
      if (hasVarieties) {
        const cvPairs = _.flatten(
          _.map(action.commodityVarietyIdentifiers, (varieties, commodityIdentifier) => (
            _.map(varieties, (varietyIdentifier) => ({ commodityIdentifier, varietyIdentifier }))
          ))
        );
        return { ...state, commodityVarietyIdentifierPairs: cvPairs };
      } else {
        return setFilterState(state, 'commodityIdentifier', _.keys(action.commodityVarietyIdentifiers));
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
    case FILTER_CONTEXT_ACTION_TYPES.THIS_YEAR_DATE_RANGE: {
      return { ...state, thisYearStartDate: action.startDate, thisYearEndDate: action.endDate };
    }
    case FILTER_CONTEXT_ACTION_TYPES.LAST_YEAR_DATE_RANGE: {
      return { ...state, lastYearStartDate: action.startDate, lastYearEndDate: action.endDate };
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

function generateFilter(collection, title, key, label, currentState, dispatch) {
  return {
    title,
    items: _.uniqBy(collectionAsOptions(collection, { key, label }), 'value'),
    key,
    onChange: (obj) => {
      dispatch({ type: FILTER_CONTEXT_ACTION_TYPES[_.toUpper(title)], values: _.keys(obj) })
    },
    defaultValues: currentState[key] ? { [currentState[key]]: [] } : {},
  };
}

const FiltersContext = React.createContext();

function FiltersProvider(props) {
  const { children } = props;
  const { customerId, commodityName } = props.match.params;

  const [filtersToRender, setFiltersToRender] = useState([]); // filters is a config array to be passed to the view for render
  const [commodityNameParam, setCommodityNameParam] = useState(commodityName);
  const [customerIdParam, setCustomerIdParam] = useState(customerId);

  const [state, dispatch] = useReducer(graphqlFiltersReducer, {
    thisYearStartDate: startOfYear(new Date()), // initial dates
    thisYearEndDate: endOfYear(new Date()),
    lastYearStartDate: startOfYear(subISOYears(new Date(), 1)),
    lastYearEndDate: endOfYear(subISOYears(new Date(), 1)),
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
        const restoredFilters = {
          ...sessionFilters,
          ...(sessionFilters.thisYearStartDate ? { thisYearStartDate: new Date(sessionFilters.thisYearStartDate)} : {}),
          ...(sessionFilters.thisYearEndDate ? { thisYearEndDate: new Date(sessionFilters.thisYearEndDate)} : {}),
          ...(sessionFilters.lastYearStartDate ? { lastYearStartDate: new Date(sessionFilters.lastYearStartDate)} : {}),
          ...(sessionFilters.lastYearEndDate ? { lastYearEndDate: new Date(sessionFilters.lastYearEndDate)} : {}),
        };
        if (!_.isEqual(restoredFilters, sessionFilters)) {
          dispatch({ type: FILTER_CONTEXT_ACTION_TYPES.RESTORE_FILTERS, filters: restoredFilters });
        }
      }
    }
  }, [didMount, sessionFilters, state]);

  useEffect(() => {
    setSessionFilters(state);
  }, [state, setSessionFilters]);

  const handleDateRangeSelected = useCallback((from, to) => {
    dispatch({
      type: "THIS_YEAR_DATE_RANGE",
      startDate: setYear(from, getYear(new Date())),
      endDate: setYear(to, getYear(new Date()))
    });
    dispatch({
      type: "LAST_YEAR_DATE_RANGE",
      startDate: setYear(from, getYear(new Date()) - 1),
      endDate: setYear(to, getYear(new Date()) - 1)
    });
  }, [dispatch]);

  useEffect(() => {
    if (data && data.erpProducts) {
      let currentFilters = [];
      if (!commodityNameParam) { // not in a commodity specific view
        const commoditiesWithSubVarieties =
          _.reduce(_.groupBy(data.erpProducts, 'commodityIdentifier'),
            (result, erpProducts, commodityIdentifier) => {
              result.push({
                value: commodityIdentifier,
                label: _.get(erpProducts, '[0].commodityName'),
                subItems: generateFilter(erpProducts, "Varieties", 'varietyIdentifier', 'varietyName', state, () => {}).items,
              });
              return result;
            }, []);
        currentFilters.push({
          title: "Commodities",
          items: commoditiesWithSubVarieties,
          key: 'commodityIdentifier',
          onChange: (obj) => dispatch(
            { type: FILTER_CONTEXT_ACTION_TYPES.COMMODITIES_AND_VARIETIES, commodityVarietyIdentifiers: obj }
          ),
          defaultValues: state['commodityIdentifier'] ?
            { [state['commodityIdentifier']]: [] } :
              state['commodityVarietyIdentifierPairs'] ?
                _.mapValues(
                  _.groupBy(state['commodityVarietyIdentifierPairs'], 'commodityIdentifier'),
                  (items) => _.map(items, 'varietyIdentifier')
                ) : {}
        });
      } else {
        // remove commodity variety identifier pairs here
        dispatch({ type: FILTER_CONTEXT_ACTION_TYPES.IN_COMMODITY_SCOPE });
      }
    
      // Size and Packaging
      currentFilters.push(generateFilter(data.erpProducts, "Size", "sizeIdentifier", "sizeName", state, dispatch));
      currentFilters.push(generateFilter(data.erpProducts, "Packaging", "packagingIdentifier", "packagingName", state, dispatch));

      if (!customerIdParam) { // not in a customer specific view
        currentFilters.push(generateFilter(data.erpCustomers, "Customer", "id", "name", state, dispatch));
      } else {
        dispatch({ type: FILTER_CONTEXT_ACTION_TYPES.IN_CUSTOMER_SCOPE });
      }

      setFiltersToRender(currentFilters);
    }
  }, [commodityNameParam, customerId, customerIdParam, data, state]);

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
