import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import getMonth from 'date-fns/get_month';
import getIsoWeek from 'date-fns/get_iso_week';
import differenceInMonths from 'date-fns/difference_in_months';
import differenceInWeeks from 'date-fns/difference_in_weeks';

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

function formatToNivoData(lineSeriesKey, groupedLineItems, yAxisField) {
  return {
    id: lineSeriesKey,
    data: _.map(groupedLineItems, (items, month) => ({ x: month, y: _.sumBy(items, yAxisField) })),
  };
}

function generateWeeklyTickValues(minDate, maxDate) {
  if (minDate && maxDate) {
    const diffInMonths = differenceInMonths(maxDate, minDate);
    if (diffInMonths >= 6) {
      return _.range(1, 53);
    } else {
      const startWeek = getIsoWeek(minDate);
      const endWeek = getIsoWeek(maxDate);
      if (differenceInWeeks(maxDate, minDate) >= 52) {
        return _.range(1, 53);
      }
      return _.range(_.clamp(startWeek - 1, 1, 53), _.clamp(endWeek + 1, 1, 53));
    }
  }
  return _.range(1, 53);
}

function numTickValuesToTake(tickValues, device) {
  const numTicks = tickValues.length;

  switch (device) {
    case 'mobile': return (numTicks <= 12) ? 6 : 9;
    case 'tablet': return (numTicks <= 12) ? 2 : 7;
    default: return (numTicks <= 12) ? 1 : 5; // desktop
  }
}

function BiLineGraph({ yAxisField, lineSeriesConfig, xInterval, minDate, maxDate, ...rest }) {
  const graphData = _.map(lineSeriesConfig, ({ id, data }) =>
    formatToNivoData(id, xInterval === "month" ? groupLineItemsByMonth(data) : groupLineItemsByWeek(data), yAxisField)
  );

  const tickValues = xInterval === "month" ? _.range(11) : generateWeeklyTickValues(minDate, maxDate);

  const commonLineGraphProps = {
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
            tickValues: takeNth(tickValues, numTickValuesToTake(tickValues, "mobile"))
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
            tickValues: takeNth(tickValues, numTickValuesToTake(tickValues, "tablet")),
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
            tickValues: takeNth(tickValues, numTickValuesToTake(tickValues, "desktop")),
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
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
}

BiLineGraph.defaultProps = {
  xInterval: 'month',
  minDate: null,
  maxDate: null,
}

export default React.memo(BiLineGraph);
