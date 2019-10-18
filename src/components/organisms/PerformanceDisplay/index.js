import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import subISOYears from 'date-fns/sub_iso_years';

import { gqlF } from '../../../helpers/dates';
import { useFilters } from '../../../contexts/filters';

import PerformanceDisplayView from './view';

function PerformanceDisplay({ match, history, graphqlQuery, graphqlFilters }) {
  const [dateInterval, setDateInterval] = useState('week');
  const { gqlFilterVariables, handleDateRangeSelected, setCommodityNameParam, setCustomerIdParam } = useFilters();
  const { startDate, endDate, ...rest } = gqlFilterVariables;

  console.log(gqlFilterVariables);

  useEffect(() => {
    setCommodityNameParam(match.params.commodityName);
    setCustomerIdParam(match.params.customerId)
  }, [match.params, setCommodityNameParam, setCustomerIdParam]);

  const { data, loading, error } = useQuery(graphqlQuery, {
    variables: {
      groupByInterval: dateInterval,
      thisYearSalesOrderLineItemFilters: {
        startDate: gqlF(startDate),
        endDate: gqlF(endDate),
        ...graphqlFilters,
        ...rest,
      },
      lastYearSalesOrderLineItemFilters: {
        startDate: gqlF(subISOYears(startDate, 1)),
        endDate: gqlF(subISOYears(endDate, 1)),
        ...graphqlFilters,
        ...rest,
      },
      filters: graphqlFilters,
    },
  });

  console.log(data);

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
