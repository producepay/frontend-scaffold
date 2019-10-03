import React, { useState } from 'react';
import Card from '../../../../components/elements/Card';
import CardHeader from '../../../../components/elements/CardHeader';
import Legend from '../../../../components/elements/Nivo/Legend';
import { useWidth } from '../../../../helpers/dom';

import SalesRevenueGraph from './sales-revenue-graph';
import VolumeSoldGraph from './volume-sold-graph';

const GraphContainer = ({ render }) => {
  const { ref } = useWidth();
  const [legendItems, setLegendItems] = useState([]);

  return (
    <div ref={ref} className='h-100'>
      <div className='px-6'>
        <Legend
          itemClassName="pr-8"
          colorClassName="rounded-full mr-4"
          labelClassName="font-normal"
          items={legendItems}
        />
      </div>
      {render(setLegendItems)}
    </div>
  )
};

function ShowCustomerSalesReportView({ thisYearSalesOrderLineItems, lastYearSalesOrderLineItems }) {
  return (
    <React.Fragment>
      <Card className='pt-4 pb-20 md:pb-16 lg:pb-12 px-2'>
        <CardHeader
          title="Sales Revenue"
          titleClassName="text-black text-lg lg:text-xl font-semibold"
          borderless
        />
        <GraphContainer render={(setLegendItems) => (
          <SalesRevenueGraph
            thisYearSalesOrderLineItems={thisYearSalesOrderLineItems}
            lastYearSalesOrderLineItems={lastYearSalesOrderLineItems}
            setLegendItems={setLegendItems}
          />
        )}/>
      </Card>
      <Card className='pt-4 pb-20 md:pb-12 lg:pb-8 px-2'>
        <CardHeader
          title="Volume Sold"
          titleClassName="text-black text-lg lg:text-xl font-semibold"
          borderless
        />
        <GraphContainer render={(setLegendItems) => (
          <VolumeSoldGraph
            thisYearSalesOrderLineItems={thisYearSalesOrderLineItems}
            lastYearSalesOrderLineItems={lastYearSalesOrderLineItems}
            setLegendItems={setLegendItems}
          />
        )}/>
      </Card>
    </React.Fragment>
  );
}

export default React.memo(ShowCustomerSalesReportView);
