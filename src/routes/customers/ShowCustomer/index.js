import React from 'react';
import gql from 'graphql-tag';
import subISOYears from 'date-fns/sub_iso_years';
import startOfYear from 'date-fns/start_of_year';
import endOfYear from 'date-fns/end_of_year';
import { useQuery } from '@apollo/react-hooks';
import { gqlF } from '../../../helpers/dates';
import ShowCustomerView from './view';

const FETCH_CUSTOMER_SHOW_DATA = gql`
  fragment lineItemData on SalesOrderLineItem {
    id
    identifier
    invoiceNumber
    purchasingCustomerName
    quantityOrdered
    salePricePerUnit
    totalSaleAmount
    invoiceTotalProfit
    weight
    shippedFromCity
    shippedFromState
    orderCreatedAt
    invoiceCreatedAt
    unitOfSale
    company {
      id
    }
    companyProductMapping {
      erpProduct {
        identifier
        name
      }
    }
  }

  query fetchCustomerShowData(
    $thisYearSalesOrderLineItemFilters: SalesOrderLineItemFilterInput,
    $lastYearSalesOrderLineItemFilters: SalesOrderLineItemFilterInput,
  ) {
    thisYearSalesOrderLineItems: salesOrderLineItems(filters: $thisYearSalesOrderLineItemFilters) {
      ...lineItemData
    }
    lastYearSalesOrderLineItems: salesOrderLineItems(filters: $lastYearSalesOrderLineItemFilters) {
      ...lineItemData
    }
  }
`;

function ShowCustomer(props) {
  const { customerName } = props.match.params;
  const { data, loading, error } = useQuery(FETCH_CUSTOMER_SHOW_DATA, {
    variables: {
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
    <ShowCustomerView
      customerName={customerName}
      data={data}
      loading={loading}
      error={error}
    />
  );
}

export default React.memo(ShowCustomer);
