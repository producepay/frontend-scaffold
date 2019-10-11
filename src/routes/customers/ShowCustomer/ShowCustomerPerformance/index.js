import React from 'react';
import gql from 'graphql-tag';

import ShowCustomerPerformanceView from './view';

const FETCH_SHOW_CUSTOMER_DATA = gql`
  fragment groupedGraphData on GroupedSalesOrderLineItem {
    totalSaleAmount
    shipmentQuantity
    groupedValue
  }

  query FetchDashboardData(
    $groupByInterval: String,
    $thisYearSalesOrderLineItemFilters: SalesOrderLineItemFilterInput,
    $lastYearSalesOrderLineItemFilters: SalesOrderLineItemFilterInput,
    $filters: SalesOrderLineItemFilterInput
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
    commodityRankingData: groupedSalesOrderLineItems(
      groupBy: "erpProducts.commodityName",
      summedFields: ["shipmentQuantity", "totalSaleAmount"],
      filters: $filters
    ) {
      groupedValue
      shipmentQuantity
      totalSaleAmount
    }
  }
`;

function ShowCustomerPerformance(props) {
  const { customerId } = props.match.params;

  return (
    <ShowCustomerPerformanceView
      graphqlQuery={FETCH_SHOW_CUSTOMER_DATA}
      graphqlFilters={{ customerId }}
    />
  );
}

export default React.memo(ShowCustomerPerformance);
