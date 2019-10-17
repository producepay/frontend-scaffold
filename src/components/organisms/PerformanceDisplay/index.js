import React, { useState, useCallback } from 'react';
import subISOYears from 'date-fns/sub_iso_years';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

import { gqlF } from '../../../helpers/dates';

import PerformanceDisplayView from './view';

function PerformanceDisplay({ history, graphqlQuery, graphqlFilters }) {
  const [dateInterval, setDateInterval] = useState('week');
  const [startDate, setStartDate] = useState(subISOYears(new Date(), 1));
  const [endDate, setEndDate] = useState(new Date());

  const { data, loading, error } = useQuery(graphqlQuery, {
    variables: {
      groupByInterval: dateInterval,
      thisYearSalesOrderLineItemFilters: {
        startDate: gqlF(startDate),
        endDate: gqlF(endDate),
        ...graphqlFilters,
      },
      lastYearSalesOrderLineItemFilters: {
        startDate: gqlF(subISOYears(startDate, 1)),
        endDate: gqlF(subISOYears(endDate, 1)),
        ...graphqlFilters,
      },
      filters: graphqlFilters,
    },
  });

  const handleDateRangeSelected = useCallback((from, to) => {
    setStartDate(from);
    setEndDate(to);
  }, [setStartDate, setEndDate]);

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
