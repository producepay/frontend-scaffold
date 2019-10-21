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
      // if (action.commodityVarietyIdentifiers.length === 0) {
      //   return state.commodityVarietyIdentifierPairs ?
      //     { ...state, commodityVarietyIdentifierPairs: [] } :
      //     { ...state, commodityIdentifier: [] };
      // }
      // const hasVarieties = _.flatten(_.map(action.commodityVarietyIdentifiers, 'subItems')).length !== 0;
      // if (hasVarieties) {
      //   const cvPairs = _.flatten(
      //     _.map(action.commodityVarietyIdentifiers, (item) => (
      //       _.map(item.subItems, (subItem) => ({ commodityIdentifier: item.value, varietyIdentifier: subItem.value }))
      //     ))
      //   );
      //   return { ...state, commodityVarietyIdentifierPairs: cvPairs };
      // } else {
      //   return setFilterState(state, 'commodityIdentifier', _.map(action.commodityVarietyIdentifiers, 'value'));
      // }
      const hasVarieties = ((action.item && action.subItem) || state.commodityVarietyIdentifierPairs);
      if (hasVarieties) {
        return setFilterState(state, 'commodityVarietyIdentifierPairs', action.item, action.subItem);  
      } else {
        return setFilterState(state, 'commodityIdentifier', action.item, action.subItem);  
      }
    }
    case FILTER_CONTEXT_ACTION_TYPES.IN_COMMODITY_SCOPE: {
      return _.omit(state, ['commodityVarietyIdentifierPairs', 'commodityIdentifier']);
    }
    case FILTER_CONTEXT_ACTION_TYPES.IN_CUSTOMER_SCOPE: {
      return _.omit(state, 'erpCustomerId');
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

function generateFilter(collection, title, key, itemKey, itemLabel, dispatch) {
  const items = _.uniqBy(collectionAsOptions(collection, { key: itemKey, label: itemLabel }), 'value');
  return {
    title,
    items,
    key,
    onChange: (item, subItem) => {
      dispatch({ type: FILTER_CONTEXT_ACTION_TYPES[_.toUpper(title).replace(/ /g, '')], item, subItem });
    },
  };
}

// function restoreDefaultCvOptions(restoredCommodityVarietyPairs, options) {
//   return _.reduce(restoredCommodityVarietyPairs, (result, cvPair) => {
//     const optionItem = _.find(options, item => item.value === cvPair.commodityIdentifier);
//     if (optionItem) {
//       const subItem = _.find(optionItem.subItems, subItem => subItem.value === cvPair.varietyIdentifier);
//       const existingItemIdx = _.findIndex(result, i => i.value === optionItem.value);
//       if (existingItemIdx > -1) {
//         result[existingItemIdx].subItems.push(subItem);
//       } else {
//         result.push({
//           value: optionItem.value,
//           label: optionItem.label,
//           subItems: [subItem],
//         });
//       }
//     }
//     return result;
//   }, []);
// }

const FiltersContext = React.createContext();

function FiltersProvider(props) {
  const { children } = props;
  // const { customerId, commodityName } = props.match.params;

  const [filtersToRender, setFiltersToRender] = useState([]); // filters is a config array to be passed to the view for render
  // const [commodityNameParam, setCommodityNameParam] = useState(commodityName);
  // const [customerIdParam, setCustomerIdParam] = useState(customerId);

  const [state, dispatch] = useReducer(graphqlFiltersReducer, {
    startDate: subISOYears(new Date(), 1), // initial dates
    endDate: new Date(),
  });
  const [sessionFilters, setSessionFilters] = useSessionStorage('filters', state);

  const { data, loading } = useQuery(FETCH_FILTER_DATA, {
    // variables: {
    //   erpProductFilters: {
    //     ...(commodityNameParam ? { commodityName: commodityNameParam } : {}),
    //   },
    // },
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
    if (data && data.erpProducts && data.erpCustomers) {
      const currentFilters = [];
      // if (!commodityNameParam) { // not in a commodity specific view
      const hasVarieties = _.compact(_.map(data.erpProducts, 'varietyIdentifier')).length > 0;
      const commoditiesWithSubVarieties =
        _.reduce(_.groupBy(data.erpProducts, 'commodityIdentifier'),
          (result, erpProducts, commodityIdentifier) => {
            result.push({
              value: commodityIdentifier,
              label: _.get(erpProducts, '[0].commodityName'),
              subItems: generateFilter(erpProducts, "Varieties", 'varietyIdentifier', 'varietyIdentifier', 'varietyName', () => {}).items,
            });
            return result;
          }, []);
      currentFilters.push({
        title: "Commodities",
        items: commoditiesWithSubVarieties,
        key: hasVarieties ? 'commodityVarietyIdentifierPairs' : 'commodityIdentifier',
        onChange: (item, subItem) => {
          dispatch(
            { type: FILTER_CONTEXT_ACTION_TYPES.COMMODITIES_AND_VARIETIES, item, subItem }
          )
        },
      });
      // } else {
      //   // remove commodity variety identifier pairs here
      //   dispatch({ type: FILTER_CONTEXT_ACTION_TYPES.IN_COMMODITY_SCOPE });
      // }
    
      // Size and Packaging
      currentFilters.push(generateFilter(data.erpProducts, "Size", "sizeIdentifier", "sizeIdentifier", "sizeName", dispatch));
      currentFilters.push(generateFilter(data.erpProducts, "Packaging", "packagingIdentifier", "packagingIdentifier", "packagingName", dispatch));

      // if (!customerIdParam) { // not in a customer specific view
      currentFilters.push(generateFilter(data.erpCustomers, "Customer", "erpCustomerId", "id", "name", dispatch));
      // } else {
      //   dispatch({ type: FILTER_CONTEXT_ACTION_TYPES.IN_CUSTOMER_SCOPE });
      // }

      setFiltersToRender(currentFilters);
    }
  }, [data]);

  const transFormFiltersToGqlVariables = useCallback(() => {
    const { commodityVarietyIdentifierPairs, startDate, endDate, ...otherFilters } = state;
    return {
      startDate,
      endDate,
      ..._.omitBy(
        _.mapValues(otherFilters, (items) => _.map(items, 'value')),
        values => values.length === 0,
      ),
      ...(commodityVarietyIdentifierPairs ? (
        _.flatten(
          _.map(state.commodityVarietyIdentifierPairs, (item) => (
            _.map(item.subItems, (subItem) => ({ commodityIdentifier: item.value, varietyIdentifier: subItem.value }))
          ))
        )
      ) : {}),
    }
  }, [state]);

  return (
    <FiltersContext.Provider value={{
      filters: filtersToRender,
      gqlFilterVariables: transFormFiltersToGqlVariables(state),
      filterValues: state,
      dispatch,
      loading,
      handleDateRangeSelected,
      // setCommodityNameParam, // components using this context must set this on route change
      // setCustomerIdParam,    // components using this context must set this on route change
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
