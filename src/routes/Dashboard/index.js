import React, { useState } from 'react';
import gql from 'graphql-tag';
import subISOYears from 'date-fns/sub_iso_years';
import startOfYear from 'date-fns/start_of_year';
import endOfYear from 'date-fns/end_of_year';
import { useQuery } from '@apollo/react-hooks';

import { gqlF } from '../../helpers/dates';

import DashboardView from './view';

const FETCH_CUSTOMER_SHOW_DATA = gql`
  fragment groupedGraphData on GroupedSalesOrderLineItem {
    totalSaleAmount
    shipmentQuantity
    groupedValue
  }

  fragment groupedRankingData on GroupedSalesOrderLineItem {
    groupedValue
    shipmentQuantity
    totalSaleAmount
  }

  query FetchDashboardData(
    $groupByInterval: String,
    $thisYearSalesOrderLineItemFilters: SalesOrderLineItemFilterInput,
    $lastYearSalesOrderLineItemFilters: SalesOrderLineItemFilterInput,
  ) {
    thisYearSalesOrderLineItems: groupedSalesOrderLineItems(
      groupBy: "orderCreatedAt",
      groupByInterval: $groupByInterval,
      summedFields: ["shipmentQuantity", "totalSaleAmount"],
      filters: $thisYearSalesOrderLineItemFilters,
    ) {
      ...groupedGraphData
    }
    lastYearSalesOrderLineItems: groupedSalesOrderLineItems(
      groupBy: "orderCreatedAt",
      groupByInterval: $groupByInterval,
      summedFields: ["shipmentQuantity", "totalSaleAmount"],
      filters: $lastYearSalesOrderLineItemFilters
    ) {
      ...groupedGraphData
    }
    customerRankingData: groupedSalesOrderLineItems(
      groupBy: "erpCustomers.name",
      summedFields: ["shipmentQuantity", "totalSaleAmount"],
      maxedFields: ["erpCustomers.id"]
    ) {
      ...groupedRankingData
      erpCustomersId
    }
    commodityRankingData: groupedSalesOrderLineItems(
      groupBy: "erpProducts.commodityName",
      summedFields: ["shipmentQuantity", "totalSaleAmount"],
    ) {
      ...groupedRankingData
    }
  }
`;

function Dashboard({ history }) {
  const [dateInterval, setDateInterval] = useState('week');

  const { data, loading, error } = useQuery(FETCH_CUSTOMER_SHOW_DATA, {
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
    },
  });

  return (
    <DashboardView
      data={data}
      loading={loading}
      error={error}
      dateInterval={dateInterval}
      setDateInterval={setDateInterval}
      history={history}
    />
  );
}

export default React.memo(Dashboard);
