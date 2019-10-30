import React from 'react';
import _ from 'lodash';
import gql from 'graphql-tag';

import { useFilterState } from '../../../../contexts/FilterState';

import ShowCommodityPerformanceView from './view';

const FETCH_SHOW_COMMODITY_DATA = gql`
  fragment groupedSummaryData on GroupedSalesOrderLineItem {
    shipmentQuantity
    totalSaleAmount
  }

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
      maxedFields: ["erpCustomers.id"],
      filters: $filters
    ) {
      groupedValue
      erpCustomersId
      shipmentQuantity
      totalSaleAmount
    }
  }
`;

function ShowCommodityPerformance(props) {
  const { commodityName } = props.match.params;
  const { gqlFilterVariables } = useFilterState();
  const filters = {
    commodityName,
    ..._.omit(gqlFilterVariables, 'commodityVarietyIdentifierPairs'),
  };

  return (
    <ShowCommodityPerformanceView
      graphqlQuery={FETCH_SHOW_COMMODITY_DATA}
      graphqlFilters={filters}
    />
  );
}

export default React.memo(ShowCommodityPerformance);
