import React from 'react';
import Card from '../../../../components/elements/Card';

import Graph from './graph';

function ShowCustomerSalesReportView({ thisYearSalesOrderLineItems, lastYearSalesOrderLineItems }) {
  return (
    <Card className='pt-4 pb-20 md:pb-12 lg:pb-8 px-2'>
      <h2 className='text-black text-lg lg:text-xl font-semibold px-6 py-4'>
        Sales Revenue
      </h2>
      <Graph
        thisYearSalesOrderLineItems={thisYearSalesOrderLineItems}
        lastYearSalesOrderLineItems={lastYearSalesOrderLineItems}
      />
    </Card>
  );
}

export default React.memo(ShowCustomerSalesReportView);
