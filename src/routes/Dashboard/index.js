import React from 'react';
import gql from 'graphql-tag';

import DashboardView from './view';
import BiLayout from '../../components/organisms/BiLayout';

import { useFilterState } from '../../contexts/FilterState';

const FETCH_DASHBOARD_DATA = gql`
  fragment groupedSummaryData on GroupedSalesOrderLineItem {
    shipmentQuantity
    totalSaleAmount
  }

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
    thisYearSummary: groupedSalesOrderLineItems(
      summedFields: ["shipmentQuantity", "totalSaleAmount"]
      filters: $thisYearSalesOrderLineItemFilters
    ) {
      ...groupedSummaryData
    }
    lastYearSummary: groupedSalesOrderLineItems(
      summedFields: ["shipmentQuantity", "totalSaleAmount"]
      filters: $lastYearSalesOrderLineItemFilters
    ) {
      ...groupedSummaryData
    }
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
  const { gqlFilterVariables } = useFilterState();
  return (
    <BiLayout>
      <DashboardView
        graphqlQuery={FETCH_DASHBOARD_DATA}
        graphqlFilters={gqlFilterVariables}
      />
    </BiLayout>
  );
}

export default React.memo(Dashboard);
