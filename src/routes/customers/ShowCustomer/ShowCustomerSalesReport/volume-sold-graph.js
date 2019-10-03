import React from 'react';
import _ from 'lodash';
import startOfYear from 'date-fns/start_of_year';
import getMonth from 'date-fns/get_month';
import addMonths from 'date-fns/add_months';
import LineGraph from '../../../../components/nivo/LineGraph';
import { monthNumToName } from '../../../../helpers/dates';
import { takeNth } from '../../../../helpers/lodash';
import { formatLoads } from '../../../../helpers/format';

const LAST_YEAR_ID = 'Last Year';
const THIS_YEAR_ID = 'This Year';
const THIS_YEAR_COLOR = '#0092d4';
const LAST_YEAR_COLOR = '#afe8fe';
const LEGEND_LABEL_COLOR = '#000000';

function groupLineItemsByMonth(lineItems) {
  const filtered = lineItems.filter(item => item.orderCreatedAt || item.invoiceCreatedAt);
  return _.groupBy(filtered, item => getMonth(item.orderCreatedAt || item.invoiceCreatedAt));
}

function formatToNivoData(lineSeriesKey, groupedLineItems) {
  return {
    id: lineSeriesKey,
    data: _.map(groupedLineItems, (items, month) => ({ x: month, y: _.sumBy(items, 'quantityOrdered') })),
  };
}

function VolumeSoldGraph({ thisYearSalesOrderLineItems, lastYearSalesOrderLineItems, setLegendItems }) {

  const thisYearGroupByMonth = groupLineItemsByMonth(thisYearSalesOrderLineItems);
  const lastYearGroupByMonth = groupLineItemsByMonth(lastYearSalesOrderLineItems);

  const graphData = [
    formatToNivoData(THIS_YEAR_ID, thisYearGroupByMonth),
    formatToNivoData(LAST_YEAR_ID, lastYearGroupByMonth),
  ];

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
    yFormat: (value) => (`${formatLoads(value)} packages`),
  };

  const commonBottomAxisProps = {
    format: monthNumToName,
  };

  setLegendItems([
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
  ]);

  return (
    <React.Fragment>
      {/* MOBILE */}
      <div className='sm:hidden h-full'>
        <LineGraph
          {...commonLineGraphProps}
          lineWidth={2}
          axisBottom={{
            ...commonBottomAxisProps,
            tickValues: takeNth(tickValues, 6)
          }}
        />
      </div>

      {/* TABLET */}
      <div className='hidden sm:block xl:hidden h-full'>
        <LineGraph
          {...commonLineGraphProps}
          axisBottom={{
            ...commonBottomAxisProps,
            tickValues: takeNth(tickValues, 2),
          }}
        />
      </div>

      {/* DESKTOP */}
      <div className='hidden xl:block h-full'>        
        <LineGraph
          {...commonLineGraphProps}
          axisBottom={{...commonBottomAxisProps}}
        />
      </div>
    </React.Fragment>
  );
}

export default React.memo(VolumeSoldGraph);
