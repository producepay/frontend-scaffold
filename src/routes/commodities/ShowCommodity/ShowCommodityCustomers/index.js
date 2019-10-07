import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import ShowCommodityCustomersView from './view';

const FETCH_GROUPED_DATA = gql`
  query groupedSalesOrderLineItems(
    $groupBy: String!,
    $groupByInterval: String,
    $summedFields: [String!],
    $averagedFields: [String!],
    $filters: SalesOrderLineItemFilterInput,
  ) {
    groupedSalesOrderLineItems(
      groupBy: $groupBy,
      groupByInterval: $groupByInterval,
      summedFields: $summedFields,
      averagedFields: $averagedFields,
      filters: $filters
    ) {
      costOfGoods
      shipmentQuantity
      salePricePerUnit
      totalSaleAmount
      invoiceTotalProfit
      groupedValue
    }
  }
`;

function ShowCommodityCustomers({ match }) {
  const { commodityId } = match.params;

  const { data, loading, error } = useQuery(FETCH_GROUPED_DATA, {
    variables: {
      groupBy: "erpCustomers.name",
      summedFields: ["shipmentQuantity", "totalSaleAmount", "invoiceTotalProfit"],
      averagedFields: ["salePricePerUnit", "costOfGoods"],
      filters: {
        commodityIdentifier: commodityId,
      },
    },
  });

  return <ShowCommodityCustomersView data={data} loading={loading} error={error} />
}

export default React.memo(ShowCommodityCustomers);
