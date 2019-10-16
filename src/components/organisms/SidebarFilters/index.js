import React from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

import LoadingSpinner from '../../elements/LoadingSpinner';

import { collectionAsOptions } from './helpers';
import SidebarView from './view';

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

function generateFilter(collection, title, key, label) {
  return {
    title,
    items: _.uniqBy(collectionAsOptions(collection, { key, label }), 'value'),
  };
}

function SidebarFilters(props) {
  const { customerId, commodityName } = props.match.params;

  const { data, loading } = useQuery(FETCH_FILTER_DATA, {});

  if (loading) {
    return <LoadingSpinner />;
  }

  let filters = [];

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
    filters.push({ title: "Commodities", items: commoditiesWithSubVarieties })
  }

  // Size
  filters.push(generateFilter(data.erpProducts, "Size", "sizeIdentifier", "sizeName"));
  filters.push(generateFilter(data.erpProducts, "Packaging", "packagingIdentifier", "packagingName"));

  return (
    <SidebarView filters={filters} />
  );
}

export default withRouter(SidebarFilters);
