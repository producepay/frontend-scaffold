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
      labelName
    }
    erpCustomers: erpCustomers {
      id
      name
    }
    otherFilterFields: uniqueSalesOrderLineItems(
      selectableFields: ["salespersonName", "shippedFromCountry"],
    ) {
      salespersonName
      shippedFromCountry
    }
  }
`;

function generateFilter(collection, title, key, itemKey, itemLabel, dispatch) {
  const items = _.uniqBy(collectionAsOptions(collection, { key: itemKey, label: itemLabel }), 'value');
  if (items.length === 0) return null;
  return {
    title,
    items,
    key,
    onChange: (item, subItem) => {
      dispatch({ type: _.toUpper(title).replace(/ /g, '_'), item, subItem });
    },
  };
}

function buildCommodityWithVarietySubItems(allErpProducts) {
  return _.map(_.groupBy(allErpProducts, 'commodityIdentifier'), (erpProducts, commodityIdentifier) => ({
    value: commodityIdentifier,
    label: _.get(erpProducts, '[0].commodityName'),
    subItems: generateFilter(erpProducts, "Varieties", 'varietyIdentifier', 'varietyIdentifier', 'varietyName', () => {}).items,
  }));
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
    if (data && data.erpProducts && data.erpCustomers && data.otherFilterFields) {
      const hasVarieties = _.compact(_.map(data.erpProducts, 'varietyIdentifier')).length > 0;
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
            generateFilter(data.erpProducts, "Label", "labelName", "labelName", "labelName", dispatch),
            (
              !erpCustomerId ?
                generateFilter(data.erpCustomers, "Customer", "erpCustomerId", "id", "name", dispatch) : null
            ),
            generateFilter(data.otherFilterFields, "Sales Person", "salespersonName", "salespersonName", "salespersonName", dispatch),
            generateFilter(data.otherFilterFields, "Country of Origin", "shippedFromCountry", "shippedFromCountry", "shippedFromCountry", dispatch),
          ]
        )
      );
    }
  }, [commodityName, data, dispatch, erpCustomerId]);

  const filtersWithSelectedItems = _.map(filtersToRender, (filter) => ({
    ...filter,
    selectedItems: filterValues[filter.key],
  }));

  return (
    <SidebarFiltersView loading={loading} filters={filtersWithSelectedItems} />
  );
}

export default React.memo(withRouter(SidebarFilters));
