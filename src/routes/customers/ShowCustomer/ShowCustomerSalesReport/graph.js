import React from 'react';
import _ from 'lodash';
import startOfYear from 'date-fns/start_of_year';
import getMonth from 'date-fns/get_month';
import addMonths from 'date-fns/add_months';
import LineGraph from '../../../../components/elements/Nivo/LineGraph';
import { formatPrice } from '../../../../helpers/format';
import { monthNumToName } from '../../../../helpers/dates';

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
    return getMonth(currentDate);
  });

  const commonLineGraphProps = {
    data: graphData,
    colors: { scheme: 'category10' },
    xScale: { type: 'linear', min: tickValues[0], max: _.last(tickValues) },
    yScale: { type: 'linear', stacked: false, min: 0, max: maxRevenue * 1.3 },
    xFormat: monthNumToName,
    axisLeft: { format: value => formatPrice(value) },
  };
  return (
    <LineGraph
      {...commonLineGraphProps}
      axisBottom={{
        legend: 'Month',
        legendPosition: 'middle',
        legendOffset: 32,
        format: monthNumToName,
      }}
    />
  );
}

export default React.memo(SalesReportGraph);
