import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import startOfYear from 'date-fns/start_of_year';
import getMonth from 'date-fns/get_month';
import addMonths from 'date-fns/add_months';
import getIsoWeek from 'date-fns/get_iso_week';
import getDay from 'date-fns/get_day';
import LineGraph from '../../../../components/nivo/LineGraph';
import { monthNumToName } from '../../../../helpers/dates';
import { formatWeek } from '../../../../helpers/format';
import { takeNth } from '../../../../helpers/lodash';

function filterInvalidLineItems(lineItems) {
  return lineItems.filter(item => item.orderCreatedAt || item.invoiceCreatedAt);
}

function groupLineItemsByMonth(lineItems) {
  return _.groupBy(filterInvalidLineItems(lineItems), item => getMonth(item.orderCreatedAt || item.invoiceCreatedAt));
}

function groupLineItemsByWeek(lineItems) {
  return _.groupBy(filterInvalidLineItems(lineItems), item => {
    const currentWeek = getIsoWeek(item.orderCreatedAt || item.invoiceCreatedAt);
    if (currentWeek > 52) {
      const day = getDay(item.orderCreatedAt || item.invoiceCreatedAt);
      if (day === 0 || day > 4) return 1; // week number will be 52 or 53 if 1st day of the year falls on a friday to sunday 
    }
    return currentWeek;
  })
}

function formatToNivoData(lineSeriesKey, groupedLineItems, yAxisField) {
  return {
    id: lineSeriesKey,
    data: _.map(groupedLineItems, (items, month) => ({ x: month, y: _.sumBy(items, yAxisField) })),
  };
}

function generateMonthlyTickValues() {
  let date = startOfYear(new Date());
  return _.range(11).map(() => {
    const currentDate = date;
    date = addMonths(currentDate, 1);
    return getMonth(currentDate);
  });
}

function generateWeeklyTickValues() {
  return _.range(1, 53);
}

function SalesReportGraph({ yAxisField, lineSeriesConfig, xInterval, ...rest }) {
  const graphData = _.map(lineSeriesConfig, ({ id, data }) =>
    formatToNivoData(id, xInterval === "month" ? groupLineItemsByMonth(data) : groupLineItemsByWeek(data), yAxisField)
  );

  const tickValues = xInterval === "month" ? generateMonthlyTickValues() : generateWeeklyTickValues();

  let commonLineGraphProps = {
    data: graphData,
    xScale: { min: tickValues[0], max: _.last(tickValues) },
    xFormat: xInterval === "month" ? monthNumToName : formatWeek, // for tooltip
  };

  const colors = _.map(lineSeriesConfig, 'color');
  if (colors && colors.length) {
    commonLineGraphProps.colors = colors; 
  }

  const commonBottomAxisProps = {
    format: xInterval === "month" ? monthNumToName : formatWeek, // for bottom axis names
  };

  return (
    <React.Fragment>
      {/* MOBILE */}
      <div className='sm:hidden h-full'>
        <LineGraph
          {...commonLineGraphProps}
          lineWidth={2}
          axisBottom={{
            ...commonBottomAxisProps,
            tickValues: takeNth(tickValues, xInterval === "month" ? 6 : 9)
          }}
          {...rest}
        />
      </div>

      {/* TABLET */}
      <div className='hidden sm:block xl:hidden h-full'>
        <LineGraph
          {...commonLineGraphProps}
          axisBottom={{
            ...commonBottomAxisProps,
            tickValues: takeNth(tickValues, xInterval === "month" ? 2 : 7),
          }}
          {...rest}
        />
      </div>

      {/* DESKTOP */}
      <div className='hidden xl:block h-full'>        
        <LineGraph
          {...commonLineGraphProps}
          axisBottom={{
            ...commonBottomAxisProps,
            tickValues: takeNth(tickValues, xInterval === "month" ? 1 : 5),
          }}
          {...rest}
        />
      </div>
    </React.Fragment>
  );
}

SalesReportGraph.propTypes = {
  yAxisField: PropTypes.string.isRequired, // fieldName of sales order line item that we will sum on the y axis
  lineSeriesConfig: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    color: PropTypes.string,
  })).isRequired,
  xInterval: PropTypes.oneOf([
    'month',
    'week', // NOTE: can add day if we need to in the future?
  ]),
}

SalesReportGraph.defaultProps = {
  xInterval: 'month',
}

export default React.memo(SalesReportGraph);
