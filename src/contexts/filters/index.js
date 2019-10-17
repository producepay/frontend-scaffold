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

import { collectionAsOptions } from './helpers';

const FETCH_FILTER_DATA = gql`
  query FetchFilterData {
    erpProducts: erpProducts {
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
  }
`;

const graphqlFiltersReducer = (state, action) => {
  switch (action.type) {
    case 'COMMODITIES_AND_VARIETIES': {
      const cvPairs = _.map(action.commodityVarietyIdentifiers, (varieties, commodityIdentifier) => (
        _.map(varieties, (varietyIdentifier) => ({ commodityIdentifier, varietyIdentifier }))
      ));
      return { ...state, commodityVarietyIdentifierPairs: cvPairs };
    }
    case 'SIZE':
      return { ...state, sizeIdentifier: action.values };
    case 'PACKAGING':
      return { ...state, packagingIdentifier: action.values };
    case 'THIS_YEAR_DATE_RANGE': {
      return { ...state, thisYearStartDate: action.startDate, thisYearEndDate: action.endDate };
    }
    case 'LAST_YEAR_DATE_RANGE': {
      return { ...state, lastYearStartDate: action.startDate, lastYearEndDate: action.endDate };
    }
    case 'INIT': {
      return { ...state, ...action.filter };
    }
    default: {
      console.log('unhandled error')
      throw new Error();
    }
  }
};

function generateFilter(collection, title, key, label, dispatch) {
  return {
    title,
    items: _.uniqBy(collectionAsOptions(collection, { key, label }), 'value'),
    key,
    onChange: (obj) => {
      dispatch({ type: _.toUpper(title), values: _.keys(obj) })
    },
  };
}

const FiltersContext = React.createContext();

function FiltersProvider(props) {
  const { children } = props;
  const { customerId, commodityName } = props.match.params;

  const { data, loading } = useQuery(FETCH_FILTER_DATA, {});
  const [filters, setFilters] = useState([]); // filters is a config array to be passed to the view for render
  const [state, dispatch] = useReducer(graphqlFiltersReducer, {
    thisYearStartDate: startOfYear(new Date()), // initial dates
    thisYearEndDate: endOfYear(new Date()),
    lastYearStartDate: startOfYear(subISOYears(new Date(), 1)),
    lastYearEndDate: endOfYear(subISOYears(new Date(), 1)),
  });

  const handleDateRangeSelected = useCallback((from, to) => {
    dispatch({ type: "THIS_YEAR_DATE_RANGE", startDate: setYear(from, getYear(new Date())), endDate: setYear(to, getYear(new Date())) });
    dispatch({ type: "LAST_YEAR_DATE_RANGE", startDate: setYear(from, getYear(new Date()) - 1), endDate: setYear(to, getYear(new Date()) - 1) });
  }, [dispatch]);

  useEffect(() => {
    if (data && data.erpProducts) {
      let currentFilters = [];
      let defaultState = {};
      if (!commodityName) { // not in a commodity specific view
        const commoditiesWithSubVarieties =
          _.reduce(_.groupBy(data.erpProducts, 'commodityIdentifier'), (result, erpProducts, commodityIdentifier) => {
            result.push({
              value: commodityIdentifier,
              label: _.get(erpProducts, '[0].commodityName'),
              subItems: generateFilter(erpProducts, "Varieties", 'varietyIdentifier', 'varietyName', () => {}).items,
            });
            return result;
          }, []);
        currentFilters.push({
          title: "Commodities",
          items: commoditiesWithSubVarieties,
          key: 'commodityIdentifier',
          onChange: (obj) => dispatch({ type: "COMMODITIES_AND_VARIETIES", commodityVarietyIdentifiers: obj }),
        });
        defaultState.commodityVarietyIdentifierPairs = _.flatten(
          _.map(commoditiesWithSubVarieties, (item) => _.map(item.subItems || [], (subItem) => (
            { commodityIdentifier: item.value, varietyIdentifier: subItem.value }
          ))
        ));
      }
    
      // Size
      currentFilters.push(generateFilter(data.erpProducts, "Size", "sizeIdentifier", "sizeName", dispatch));
      currentFilters.push(generateFilter(data.erpProducts, "Packaging", "packagingIdentifier", "packagingName", dispatch));
      setFilters(currentFilters);
      dispatch({
        type: "INIT",
        filter: {
          ..._.omit(_.mapValues(_.keyBy(currentFilters, 'key'), (filter) => _.map(filter.items, 'value')), 'commodityIdentifier'),
          ...defaultState,
        },
      });
    }
  }, [commodityName, data]);

  return (
    <FiltersContext.Provider value={{
      filters,
      queryFilters: state,
      dispatch,
      loading,
      handleDateRangeSelected,
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
