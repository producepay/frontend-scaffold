import React from 'react';
import Card from '../../components/elements/Card';
import CardHeader from '../../components/elements/CardHeader';
import Legend from '../../components/elements/Nivo/Legend';
import { formatLoads } from '../../helpers/format';
import SummaryGraph from './summary-graph';

const LAST_YEAR_ID = 'Last Year';
const THIS_YEAR_ID = 'This Year';
const THIS_YEAR_COLOR = '#0092d4';
const LAST_YEAR_COLOR = '#afe8fe';
const LEGEND_LABEL_COLOR = '#000000';

const GraphContainer = ({ children }) => {
  return (
    <div className='h-100'>
      <div className='px-6 pb-4'>
        <Legend
          itemClassName="pr-8"
          colorClassName="rounded-full mr-4"
          labelFontWeight="normal"
          items={[
            {
              label: THIS_YEAR_ID,
              color: THIS_YEAR_COLOR,
              labelColor: LEGEND_LABEL_COLOR,
            },
            {
              label: LAST_YEAR_ID,
              color: LAST_YEAR_COLOR,
              labelColor: LEGEND_LABEL_COLOR,
            },
          ]}
        />
      </div>
      {children}
    </div>
  )
};

function GraphsSection({ thisYearSalesOrderLineItems, lastYearSalesOrderLineItems }) {
  const lineSeriesConfig = [
    { id: THIS_YEAR_ID, data: thisYearSalesOrderLineItems, color: THIS_YEAR_COLOR },
    { id: LAST_YEAR_ID, data: lastYearSalesOrderLineItems, color: LAST_YEAR_COLOR },
  ];
  return (
    <div>
      <Card className='pt-4 pb-32 lg:pb-24 px-2'>
        <CardHeader
          title="Sales Revenue"
          titleClassName="text-black text-lg lg:text-xl font-semibold"
          borderless
        />
        <GraphContainer>
          <SummaryGraph
            lineSeriesConfig={lineSeriesConfig}
            yAxisField="totalSaleAmount"
            yUnit="dollars"
            xInterval="week"
            margin={{left: 62}}
          />
        </GraphContainer>
      </Card>
      <Card className='pt-4 pb-32 lg:pb-24 px-2'>
        <CardHeader
          title="Volume Sold"
          titleClassName="text-black text-lg lg:text-xl font-semibold"
          borderless
        />
        <GraphContainer>
          <SummaryGraph
            lineSeriesConfig={lineSeriesConfig}
            yAxisField="shipmentQuantity"
            yFormat={value => (`${formatLoads(value)} packages`)}
            xInterval="week"
          />
        </GraphContainer>
      </Card>
    </div>
  );
}

export default React.memo(GraphsSection);
