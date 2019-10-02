import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import _ from 'lodash';
import startOfYear from 'date-fns/start_of_year';
import getMonth from 'date-fns/get_month';
import addMonths from 'date-fns/add_months';
import format from 'date-fns/format';
import { formatPrice } from '../../../../helpers/format';

const LAST_YEAR_ID = 'Last Year';
const THIS_YEAR_ID = 'This Year';

function SalesReportGraph({ thisYearSalesOrderLineItems, lastYearSalesOrderLineItems }) {
  const thisYearLineItems = thisYearSalesOrderLineItems.filter(item => item.orderCreatedAt || item.invoiceCreatedAt);
  const lastYearLineItems = lastYearSalesOrderLineItems.filter(item => item.orderCreatedAt || item.invoiceCreatedAt);
  const thisYearGroupByMonth = _.groupBy(thisYearLineItems, item => getMonth(item.orderCreatedAt || item.invoiceCreatedAt));
  const lastYearGroupByMonth = _.groupBy(lastYearLineItems, item => getMonth(item.orderCreatedAt || item.invoiceCreatedAt));

  let graphData = [];
  let values = [];
  graphData.push({ id: THIS_YEAR_ID, data: _.map(thisYearGroupByMonth, (items, month) => {
    const monthlyTotal = _.sumBy(items, 'totalSaleAmount');
    values.push(monthlyTotal);
    return { x: month, y: monthlyTotal};
  })});
  graphData.push({ id: LAST_YEAR_ID, data: _.map(lastYearGroupByMonth, (items, month) => {
    const monthlyTotal = _.sumBy(items, 'totalSaleAmount');
    values.push(monthlyTotal);
    return { x: month, y: monthlyTotal};
  })});

  const maxRevenue = _.max(values);

  let date = startOfYear(new Date());
  const tickValues = [...Array(12)].map(() => {
    const currentDate = date;
    date = addMonths(currentDate, 1);
    return currentDate;
  });

  const commonLineGraphProps = {
    data: graphData,
    colors: { scheme: 'category10' },
    margin: { top: 4, right: 32, bottom: 40, left: 48 },
    xScale: { type: 'linear', min: tickValues[0], max: _.last(tickValues) },
    xFormat: (d) => format(d, 'MMM'),
    yScale: { type: 'linear', stacked: false, min: 0, max: maxRevenue * 1.3 },
    axisLeft: { format: value => formatPrice(value) },
    enableGridX: false,
    enableSlices: 'x',
    lineWidth: 3,
    animate: false
  };
  return (
    <div>
      <ResponsiveLine
        {...commonLineGraphProps}
        axisBottom={{
          legend: 'Month',
          legendPosition: 'middle',
          legendOffset: 32,
          tickValues,
        }}
      />
    </div>
  );
}

export default React.memo(SalesReportGraph);
