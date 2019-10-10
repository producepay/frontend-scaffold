import React, { useState } from 'react';
import gql from 'graphql-tag';
import subISOYears from 'date-fns/sub_iso_years';
import startOfYear from 'date-fns/start_of_year';
import endOfYear from 'date-fns/end_of_year';
import { useQuery } from '@apollo/react-hooks';

import { gqlF } from '../../../helpers/dates';

import PerformanceDisplayView from './view';

function PerformanceDisplay({ history, graphqlQuery, graphqlVariables }) {
  const [dateInterval, setDateInterval] = useState('week');

  const { data, loading, error } = useQuery(graphqlQuery, {
    variables: {
      groupByInterval: dateInterval,
      thisYearSalesOrderLineItemFilters: {
        startDate: gqlF(startOfYear(new Date())),
        endDate: gqlF(new Date()),
      },
      lastYearSalesOrderLineItemFilters: {
        startDate: gqlF(startOfYear(subISOYears(new Date(), 1))),
        endDate: gqlF(endOfYear(subISOYears(new Date(), 1))),
      },
      ...graphqlVariables,
    },
  });

  return (
    <PerformanceDisplayView
      data={data}
      loading={loading}
      error={error}
      dateInterval={dateInterval}
      setDateInterval={setDateInterval}
      history={history}
    />
  );
}

export default React.memo(PerformanceDisplay);
