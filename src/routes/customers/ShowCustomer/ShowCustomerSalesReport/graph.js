import React from 'react';
import _ from 'lodash';
import startOfYear from 'date-fns/start_of_year';
import getMonth from 'date-fns/get_month';
import addMonths from 'date-fns/add_months';
import LineGraph from '../../../../components/nivo/LineGraph';
import Legend from '../../../../components/elements/Nivo/Legend';
import { monthNumToName } from '../../../../helpers/dates';
import { useWidth } from '../../../../helpers/dom';

const LAST_YEAR_ID = 'Last Year';
const THIS_YEAR_ID = 'This Year';
const THIS_YEAR_COLOR = '#0092d4';
const LAST_YEAR_COLOR = '#afe8fe';
const LEGEND_LABEL_COLOR = '#000000';

function SalesReportGraph({ thisYearSalesOrderLineItems, lastYearSalesOrderLineItems }) {
  const { ref } = useWidth();

  const thisYearLineItems = thisYearSalesOrderLineItems.filter(item => item.orderCreatedAt || item.invoiceCreatedAt);
  const lastYearLineItems = lastYearSalesOrderLineItems.filter(item => item.orderCreatedAt || item.invoiceCreatedAt);
  const thisYearGroupByMonth = _.groupBy(thisYearLineItems, item => getMonth(item.orderCreatedAt || item.invoiceCreatedAt));
  const lastYearGroupByMonth = _.groupBy(lastYearLineItems, item => getMonth(item.orderCreatedAt || item.invoiceCreatedAt));

  let graphData = [];
  graphData.push({ id: THIS_YEAR_ID, data: _.map(thisYearGroupByMonth, (items, month) => {
    return { x: month, y: _.sumBy(items, 'totalSaleAmount') };
  })});
  graphData.push({ id: LAST_YEAR_ID, data: _.map(lastYearGroupByMonth, (items, month) => {
    return { x: month, y: _.sumBy(items, 'totalSaleAmount') };
  })});

  let date = startOfYear(new Date());
  const tickValues = [...Array(12)].map(() => {
    const currentDate = date;
    date = addMonths(currentDate, 1);
    return getMonth(currentDate);
  });

  const commonLineGraphProps = {
    data: graphData,
    colors: [THIS_YEAR_COLOR, LAST_YEAR_COLOR],
    xScale: { min: tickValues[0], max: _.last(tickValues) },
    xFormat: monthNumToName,
  };
  return (
    <div ref={ref} className='h-100'>
      <Legend
        itemClassName="pr-8"
        colorClassName="rounded-full mr-4"
        labelClassName="font-normal"
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
      <LineGraph
        yUnit="dollars"
        {...commonLineGraphProps}
        axisBottom={{
          format: monthNumToName,
        }}
      />
    </div>
  );
}

export default React.memo(SalesReportGraph);
