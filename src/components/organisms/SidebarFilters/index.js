import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import { useFilters } from '../../../contexts/filters';
import SidebarFiltersView from './view';

function SidebarFilters(props) {
  const { loading, filters, filterValues } = useFilters();
  const { customerId, commodityName } = props.match.params;
  
  const filtersToShow = commodityName ?
    _.filter(filters, filter => filter.title === "Commodities") :
    customerId ? _.filter(filters, filter => filter.title === "Customer") : filters;

  const filtersWithValues = _.map(filtersToShow, (filter) => ({
    ...filter,
    values: filterValues[filter.key],
  }));

  return (
    <SidebarFiltersView loading={loading} filters={filtersWithValues} />
  );
}

export default React.memo(withRouter(SidebarFilters));
