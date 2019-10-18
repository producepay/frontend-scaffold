import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import differenceInCalendarWeeks from 'date-fns/difference_in_calendar_weeks';
import format from 'date-fns/format';

import { getUTCDate, utcDateStrToTimeZoneOffset } from '../../../helpers/dates';

import LineGraph from '../../nivo/LineGraph';

const mapDataForNivo = (data, yAxisField) => data.map((d) => ({
  x: utcDateStrToTimeZoneOffset(d.groupedValue),
  y: d[yAxisField],
}));

const formatDate = (d) => format(d, 'MMM D, \'YY');

function numTickValuesToTake(tickValues, device) {
  const numTicks = tickValues.length;

  switch (device) {
    case 'mobile': return (numTicks <= 12) ? 6 : 9;
    case 'tablet': return (numTicks <= 12) ? 2 : 7;
    default: return (numTicks <= 12) ? 1 : 5; // desktop
  }
}

function BiLineGraph({ yAxisField, lineSeriesConfig, xInterval, minDate, maxDate, ...rest }) {
  const graphData = _.map(lineSeriesConfig, ({ id, data }) => ({ id, data: mapDataForNivo(data, yAxisField) }));
  const numWeeks = differenceInCalendarWeeks(maxDate, minDate);

  const commonLineGraphProps = {
    data: graphData,
    xScale: { type: 'time', format: '%Y-%m-%d %H:%M:%S', precision: 'day' },
    xFormat: formatDate,
  };

  const colors = _.map(lineSeriesConfig, 'color');
  if (colors && colors.length) commonLineGraphProps.colors = colors; 

  const commonBottomAxisProps = { format: formatDate };

  return (
    <React.Fragment>
      {/* MOBILE */}
      <div className='sm:hidden h-full'>
        <LineGraph
          {...commonLineGraphProps}
          lineWidth={2}
          axisBottom={{
            ...commonBottomAxisProps,
            tickValues: `every ${numTickValuesToTake(numWeeks, 'mobile')} weeks`,
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
            tickValues: `every ${numTickValuesToTake(numWeeks, 'tablet')} weeks`,
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
            tickValues: `every ${numTickValuesToTake(numWeeks, 'desktop')} weeks`,
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
