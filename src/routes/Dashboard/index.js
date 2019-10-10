import React, { useState } from 'react';
import gql from 'graphql-tag';
import subISOYears from 'date-fns/sub_iso_years';
import startOfYear from 'date-fns/start_of_year';
import endOfYear from 'date-fns/end_of_year';
import { useQuery } from '@apollo/react-hooks';

import { gqlF } from '../../helpers/dates';

import DashboardView from './view';

const FETCH_CUSTOMER_SHOW_DATA = gql`
  fragment groupedLineItemData on GroupedSalesOrderLineItem {
    totalSaleAmount
    shipmentQuantity
    groupedValue
  }

  query FetchCustomerShowData(
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
      ...groupedLineItemData
    }
    lastYearSalesOrderLineItems: groupedSalesOrderLineItems(
      groupBy: "orderCreatedAt",
      groupByInterval: $groupByInterval,
      summedFields: ["shipmentQuantity", "totalSaleAmount"],
      filters: $lastYearSalesOrderLineItemFilters
    ) {
      ...groupedLineItemData
    }
    customerRankingData: groupedSalesOrderLineItems(
      groupBy: "erpCustomers.name",
      summedFields: ["shipmentQuantity", "totalSaleAmount"]
    ) {
      groupedValue
      shipmentQuantity
      totalSaleAmount
    }
    commodityRankingData: groupedSalesOrderLineItems(
      groupBy: "erpProducts.commodityName",
      summedFields: ["shipmentQuantity", "totalSaleAmount"]
    ) {
      groupedValue
      shipmentQuantity
      totalSaleAmount
    }
  }
`;

function Dashboard() {
  const [dateInterval, setDateInterval] = useState("week");

  const { data, loading, error } = useQuery(FETCH_GRAPH_DATA, {
    variables: {
      groupBy: "orderCreatedAt",
      groupByInterval: dateInterval,
      summedFields: ["shipmentQuantity", "totalSaleAmount"],
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
    />
  );
}

export default React.memo(Dashboard);
