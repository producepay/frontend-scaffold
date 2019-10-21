import React, { useState } from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import subISOYears from 'date-fns/sub_iso_years';

import { gqlF } from '../../../helpers/dates';
import { useFilterState } from '../../../contexts/FilterState';

import PerformanceDisplayView from './view';

function PerformanceDisplay({ match, history, graphqlQuery, graphqlFilters }) {
  const [dateInterval, setDateInterval] = useState('week');
  const { gqlFilterVariables, handleDateRangeSelected } = useFilterState();
  const { customerId, commodityName } = match.params;
  const { startDate, endDate, ...rest } = gqlFilterVariables;

  const filterVariables = commodityName ?
    _.omit(rest, ['commodityIdentifier', 'commodityVarietyIdentifierPairs']) :
    customerId ?
      _.omit(rest, ['erpCustomerId']) : rest;

  const { data, loading, error } = useQuery(graphqlQuery, {
    variables: {
      groupByInterval: dateInterval,
      thisYearSalesOrderLineItemFilters: {
        startDate: gqlF(startDate),
        endDate: gqlF(endDate),
        ...graphqlFilters,
        ...filterVariables,
      },
      lastYearSalesOrderLineItemFilters: {
        startDate: gqlF(subISOYears(startDate, 1)),
        endDate: gqlF(subISOYears(endDate, 1)),
        ...graphqlFilters,
        ...filterVariables,
      },
      filters: graphqlFilters,
    },
    fetchPolicy: 'network-only', // query was not refetching when commodityVarietyIdentifierPairs changed sometimes (specifically variety sub items)
  });

  return (
    <PerformanceDisplayView
      data={data}
      loading={loading}
      error={error}
      dateInterval={dateInterval}
      setDateInterval={setDateInterval}
      handleDateRangeSelected={handleDateRangeSelected}
      startDate={startDate}
      endDate={endDate}
      history={history}
    />
  );
}

export default withRouter(PerformanceDisplay);
