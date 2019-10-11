import React, { useState, useCallback } from 'react';
import gql from 'graphql-tag';
import subISOYears from 'date-fns/sub_iso_years';
import startOfYear from 'date-fns/start_of_year';
import endOfYear from 'date-fns/end_of_year';
import setYear from 'date-fns/set_year';
import getYear from 'date-fns/get_year';

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
      summedFields: ["shipmentQuantity", "totalSaleAmount"],
      maxedFields: ["erpCustomers.id"]
    ) {
      groupedValue
      erpCustomersId
      shipmentQuantity
      totalSaleAmount
    }
    commodityRankingData: groupedSalesOrderLineItems(
      groupBy: "erpProducts.commodityName",
      summedFields: ["shipmentQuantity", "totalSaleAmount"],
    ) {
      groupedValue
      shipmentQuantity
      totalSaleAmount
    }
  }
`;

function Dashboard({ history }) {
  const [dateInterval, setDateInterval] = useState('week');
  const [thisYearStartDate, setThisYearStartDate] = useState(startOfYear(new Date()));
  const [thisYearEndDate, setThisYearEndDate] = useState(new Date());
  const [lastYearStartDate, setLastYearStartDate] = useState(startOfYear(subISOYears(new Date(), 1)));
  const [lastYearEndDate, setLastYearEndDate] = useState(endOfYear(subISOYears(new Date(), 1)));

  const { data, loading, error, refetch } = useQuery(FETCH_CUSTOMER_SHOW_DATA, {
    variables: {
      groupBy: "orderCreatedAt",
      groupByInterval: dateInterval,
      summedFields: ["shipmentQuantity", "totalSaleAmount"],
      thisYearSalesOrderLineItemFilters: {
        startDate: gqlF(thisYearStartDate),
        endDate: gqlF(thisYearEndDate),
      },
      lastYearSalesOrderLineItemFilters: {
        startDate: gqlF(lastYearStartDate),
        endDate: gqlF(lastYearEndDate),
      },
    },
  });

  const handleDateRangeSelected = useCallback((from, to) => {
    setThisYearStartDate(setYear(from, getYear(new Date())));
    setThisYearEndDate(setYear(to, getYear(new Date())));
    setLastYearStartDate(setYear(from, getYear(subISOYears(new Date(), 1))));
    setLastYearEndDate(setYear(to, getYear(subISOYears(new Date(), 1))));
    refetch();
  }, [setThisYearStartDate, setThisYearEndDate, setLastYearStartDate, setLastYearEndDate, refetch])

  return (
    <DashboardView
      data={data}
      loading={loading}
      error={error}
      dateInterval={dateInterval}
      setDateInterval={setDateInterval}
      thisYearStartDate={thisYearStartDate}
      thisYearEndDate={thisYearEndDate}
      handleDateRangeSelected={handleDateRangeSelected}
      history={history}
    />
  );
}

export default React.memo(Dashboard);
