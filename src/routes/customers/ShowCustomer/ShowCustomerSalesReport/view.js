import React from 'react';

import Graph from './graph';

function ShowCustomerSalesReportView({ thisYearSalesOrderLineItems, lastYearSalesOrderLineItems }) {
  return (
    <div>
      <Graph
        thisYearSalesOrderLineItems={thisYearSalesOrderLineItems}
        lastYearSalesOrderLineItems={lastYearSalesOrderLineItems}
      />
    </div>
  );
}

export default React.memo(ShowCustomerSalesReportView);
