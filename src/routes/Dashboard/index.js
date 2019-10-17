import React from 'react';
import gql from 'graphql-tag';

import DashboardView from './view';

const FETCH_DASHBOARD_DATA = gql`
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
      groupBy: "invoiceCreatedAt",
      groupByInterval: $groupByInterval,
      summedFields: ["shipmentQuantity", "totalSaleAmount"],
      filters: $thisYearSalesOrderLineItemFilters,
    ) {
      ...groupedGraphData
    }
    lastYearSalesOrderLineItems: groupedSalesOrderLineItems(
      groupBy: "invoiceCreatedAt",
      groupByInterval: $groupByInterval,
      summedFields: ["shipmentQuantity", "totalSaleAmount"],
      filters: $lastYearSalesOrderLineItemFilters
    ) {
      ...groupedGraphData
    }
    customerRankingData: groupedSalesOrderLineItems(
      groupBy: "erpCustomers.name",
      summedFields: ["shipmentQuantity", "totalSaleAmount"],
      maxedFields: ["erpCustomers.id"],
      filters: $thisYearSalesOrderLineItemFilters,
    ) {
      ...groupedRankingData
      erpCustomersId
    }
    commodityRankingData: groupedSalesOrderLineItems(
      groupBy: "erpProducts.commodityName",
      summedFields: ["shipmentQuantity", "totalSaleAmount"],
      filters: $thisYearSalesOrderLineItemFilters,
    ) {
      ...groupedRankingData
    }
  }
`;

function Dashboard() {
  return (
    <DashboardView
      graphqlQuery={FETCH_DASHBOARD_DATA}
    />
  );
}

export default React.memo(Dashboard);
