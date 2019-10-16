import React, { useState, useCallback } from 'react';
import subISOYears from 'date-fns/sub_iso_years';
import startOfYear from 'date-fns/start_of_year';
import endOfYear from 'date-fns/end_of_year';
import setYear from 'date-fns/set_year';
import getYear from 'date-fns/get_year';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

import { gqlF } from '../../../helpers/dates';

import PerformanceDisplayView from './view';

function PerformanceDisplay({ history, graphqlQuery, graphqlFilters }) {
  const [dateInterval, setDateInterval] = useState('week');
  const [thisYearStartDate, setThisYearStartDate] = useState(startOfYear(new Date()));
  const [thisYearEndDate, setThisYearEndDate] = useState(endOfYear(new Date()));
  const [lastYearStartDate, setLastYearStartDate] = useState(startOfYear(subISOYears(new Date(), 1)));
  const [lastYearEndDate, setLastYearEndDate] = useState(endOfYear(subISOYears(new Date(), 1)));

  const { data, loading, error } = useQuery(graphqlQuery, {
    variables: {
      groupByInterval: dateInterval,
      thisYearSalesOrderLineItemFilters: {
        startDate: gqlF(thisYearStartDate),
        endDate: gqlF(thisYearEndDate),
        ...graphqlFilters,
      },
      lastYearSalesOrderLineItemFilters: {
        startDate: gqlF(lastYearStartDate),
        endDate: gqlF(lastYearEndDate),
        ...graphqlFilters,
      },
      filters: graphqlFilters,
    },
  });

  const handleDateRangeSelected = useCallback((from, to) => {
    setThisYearStartDate(setYear(from, getYear(new Date())));
    setThisYearEndDate(setYear(to, getYear(new Date())));
    setLastYearStartDate(setYear(from, getYear(new Date()) - 1));
    setLastYearEndDate(setYear(to, getYear(new Date()) - 1));
  }, [setThisYearStartDate, setThisYearEndDate, setLastYearStartDate, setLastYearEndDate]);

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
