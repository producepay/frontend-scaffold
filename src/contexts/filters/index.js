import React, { useState, useReducer, useEffect, useContext } from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
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
    case 'COMMODITIES':
      return { ...state, commodityIdentifier: action.values };
    case 'SIZES':
      return { ...state, sizeIdentifier: action.values };
    case 'PACKAGINGS':
      return { ...state, packagingIdentifier: action.values };
    case 'INIT': {
      return action.filter;
    }
    default:
      throw new Error();
  }
};

function generateFilter(collection, title, key, label) {
  return {
    title,
    items: _.uniqBy(collectionAsOptions(collection, { key, label }), 'value'),
    key,
  };
}

const FiltersContext = React.createContext();

function FiltersProvider(props) {
  const { children } = props;
  const { customerId, commodityName } = props.match.params;

  const { data, loading } = useQuery(FETCH_FILTER_DATA, {});
  const [filters, setFilters] = useState([]); // filters is a config array to be passed to the view for render
  const [state, dispatch] = useReducer(graphqlFiltersReducer, {}); // contains graphql filters

  useEffect(() => {
    if (data && data.erpProducts) {
      let currentFilters = [];
      if (!commodityName) { // not in a commodity specific view
        const commoditiesWithSubVarieties =
          _.reduce(_.groupBy(data.erpProducts, 'commodityIdentifier'), (result, erpProducts, commodityIdentifier) => {
            result.push({
              value: commodityIdentifier,
              label: _.get(erpProducts, '[0].commodityName'),
              subItems: generateFilter(erpProducts, "Varieties", 'varietyIdentifier', 'varietyName').items,
            });
            return result;
          }, []);
        currentFilters.push({ title: "Commodities", items: commoditiesWithSubVarieties, key: 'commodityIdentifier' });
      }
    
      // Size
      currentFilters.push(generateFilter(data.erpProducts, "Size", "sizeIdentifier", "sizeName"));
      currentFilters.push(generateFilter(data.erpProducts, "Packaging", "packagingIdentifier", "packagingName"));
      setFilters(currentFilters);
      dispatch({ type: "INIT", filter: _.mapValues(_.keyBy(currentFilters, 'key'), (filter) => _.map(filter.items, 'value')) });
    }
  }, [commodityName, data]);

  return (
    <FiltersContext.Provider value={{
      filters,
      graphqlFilters: state,
      dispatch,
      loading,
    }}>
      {children}
    </FiltersContext.Provider> 
  );
}

function useFilters() {
  return useContext(FiltersContext);
}

export default withRouter(FiltersProvider);
const WrappedFiltersProvider = withRouter(React.memo(FiltersProvider));

export {
  WrappedFiltersProvider as FiltersProvider,
  useFilters,
};
