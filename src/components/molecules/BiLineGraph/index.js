import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import getMonth from 'date-fns/get_month';
import getIsoWeek from 'date-fns/get_iso_week';

import { monthNumToName } from '../../../helpers/dates';
import { formatWeek } from '../../../helpers/format';
import { takeNth } from '../../../helpers/lodash';

import LineGraph from '../../nivo/LineGraph';

function groupLineItemsByMonth(lineItems) {
  return _.groupBy(_.filter(lineItems, 'groupedValue'), item => getMonth(item.groupedValue));
}

function groupLineItemsByWeek(lineItems) {
  return _.groupBy(_.filter(lineItems, 'groupedValue'), item => getIsoWeek(item.groupedValue));
}

const generateMonthlyTickValues = () => _.range(11);
const generateWeeklyTickValues = () => _.range(1, 53);

function formatToNivoData(lineSeriesKey, groupedLineItems, yAxisField) {
  return {
    id: lineSeriesKey,
    data: _.map(groupedLineItems, (items, month) => ({ x: month, y: _.sumBy(items, yAxisField) })),
  };
}

function BiLineGraph({ yAxisField, lineSeriesConfig, xInterval, ...rest }) {
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

BiLineGraph.propTypes = {
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

BiLineGraph.defaultProps = {
  xInterval: 'month',
}

export default React.memo(BiLineGraph);
