import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import { useFilters } from '../../../contexts/filters';
import SidebarFiltersView from './view';

function SidebarFilters(props) {
  const { loading, filters } = useFilters();
  const { customerId, commodityName } = props.match.params;
  
  const filtersToShow = commodityName ?
    _.filter(filters, filter => filter.title === "Commodities") :
    customerId ? _.filter(filters, filter => filter.title === "Customer") : filters;

  return (
    <SidebarFiltersView loading={loading} filters={filtersToShow} />
  );
}

export default React.memo(withRouter(SidebarFilters));
