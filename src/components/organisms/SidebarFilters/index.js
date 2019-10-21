import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

import { useFilterState } from '../../../contexts/FilterState';
import { collectionAsOptions } from './helpers';
import SidebarFiltersView from './view';

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

function generateFilter(collection, title, key, itemKey, itemLabel, dispatch) {
  const items = _.uniqBy(collectionAsOptions(collection, { key: itemKey, label: itemLabel }), 'value');
  return {
    title,
    items,
    key,
    onChange: (item, subItem) => {
      dispatch({ type: _.toUpper(title).replace(/ /g, ''), item, subItem });
    },
  };
}

function buildCommodityWithVarietySubItems(allErpProducts) {
  return _.reduce(
    _.groupBy(allErpProducts, 'commodityIdentifier'),
    (result, erpProducts, commodityIdentifier) => {
      result.push({
        value: commodityIdentifier,
        label: _.get(erpProducts, '[0].commodityName'),
        subItems: generateFilter(erpProducts, "Varieties", 'varietyIdentifier', 'varietyIdentifier', 'varietyName', () => {}).items,
      });
      return result;
    }, []
  );
}

function SidebarFilters(props) {
  const { customerId: erpCustomerId, commodityName } = props.match.params;

  const { filterValues, dispatch } = useFilterState();
  const [ filtersToRender, setFiltersToRender ] = useState([]);

  const { data, loading } = useQuery(FETCH_FILTER_DATA, {
    variables: {
      erpProductFilters: {
        ...(commodityName ? { commodityName } : {}),
      },
    },
  });

  useEffect(() => {
    if (data && data.erpProducts && data.erpCustomers) {
      setFiltersToRender(
        _.compact(
          [
            (!commodityName ? {
              title: "Commodities",
              items: buildCommodityWithVarietySubItems(data.erpProducts),
              key: 'commodityVarietyIdentifierPairs',
              onChange: (item, subItem) => {
                dispatch({
                  type: 'COMMODITIES_AND_VARIETIES',
                  item,
                  subItem,
                });
              },
            } : null),
            generateFilter(data.erpProducts, "Size", "sizeIdentifier", "sizeIdentifier", "sizeName", dispatch),
            generateFilter(data.erpProducts, "Packaging", "packagingIdentifier", "packagingIdentifier", "packagingName", dispatch),
            (
              !erpCustomerId ?
                generateFilter(data.erpCustomers, "Customer", "erpCustomerId", "id", "name", dispatch) : null
            ),
          ]
        )
      );
    }
  }, [commodityName, data, dispatch, erpCustomerId]);

  const filtersWithValues = _.map(filtersToRender, (filter) => ({
    ...filter,
    values: filterValues[filter.key],
  }));

  return (
    <SidebarFiltersView loading={loading} filters={filtersWithValues} />
  );
}

export default React.memo(withRouter(SidebarFilters));
