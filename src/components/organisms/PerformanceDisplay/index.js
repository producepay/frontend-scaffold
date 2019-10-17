import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

import { gqlF } from '../../../helpers/dates';
import { useFilters } from '../../../contexts/filters';

import PerformanceDisplayView from './view';

function PerformanceDisplay({ match, history, graphqlQuery, graphqlFilters }) {
  const [dateInterval, setDateInterval] = useState('week');
  const { gqlFilterVariables, handleDateRangeSelected, setCommodityNameParam, setCustomerIdParam } = useFilters();
  const { thisYearStartDate, thisYearEndDate, lastYearStartDate, lastYearEndDate, ...rest } = gqlFilterVariables;

  useEffect(() => {
    setCommodityNameParam(match.params.commodityName);
    setCustomerIdParam(match.params.customerId)
  }, [match.params, setCommodityNameParam, setCustomerIdParam]);

  const { data, loading, error } = useQuery(graphqlQuery, {
    variables: {
      groupByInterval: dateInterval,
      thisYearSalesOrderLineItemFilters: {
        startDate: gqlF(thisYearStartDate),
        endDate: gqlF(thisYearEndDate),
        ...graphqlFilters,
        ...rest,
      },
      lastYearSalesOrderLineItemFilters: {
        startDate: gqlF(lastYearStartDate),
        endDate: gqlF(lastYearEndDate),
        ...graphqlFilters,
        ...rest,
      },
      filters: { ...graphqlFilters },
    },
  });

  return (
    <PerformanceDisplayView
      data={data}
      loading={loading}
      error={error}
      dateInterval={dateInterval}
      setDateInterval={setDateInterval}
      handleDateRangeSelected={handleDateRangeSelected}
      thisYearStartDate={thisYearStartDate}
      thisYearEndDate={thisYearEndDate}
      history={history}
    />
  );
}

export default withRouter(PerformanceDisplay);
