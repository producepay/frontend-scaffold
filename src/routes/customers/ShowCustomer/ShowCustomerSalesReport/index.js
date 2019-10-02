import React from 'react';
import _ from 'lodash';
import PageSpinner from '../../../../components/elements/PageSpinner';

import ShowCustomerSalesReportView from './view';

function ShowCustomerSalesReport({ data, loading, error }) {
  if (loading) {
    return <PageSpinner />
  }

  const thisYearSalesOrderLineItems = _.get(data, 'thisYearSalesOrderLineItems', []);
  const lastYearSalesOrderLineItems = _.get(data, 'lastYearSalesOrderLineItems', []);

  return (
    <ShowCustomerSalesReportView
      thisYearSalesOrderLineItems={thisYearSalesOrderLineItems}
      lastYearSalesOrderLineItems={lastYearSalesOrderLineItems}
  />);
}

export default React.memo(ShowCustomerSalesReport);
