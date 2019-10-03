import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import startOfYear from 'date-fns/start_of_year';
import getMonth from 'date-fns/get_month';
import addMonths from 'date-fns/add_months';
import LineGraph from '../../../../components/nivo/LineGraph';
import { monthNumToName } from '../../../../helpers/dates';
import { takeNth } from '../../../../helpers/lodash';

function groupLineItemsByMonth(lineItems) {
  const filtered = lineItems.filter(item => item.orderCreatedAt || item.invoiceCreatedAt);
  return _.groupBy(filtered, item => getMonth(item.orderCreatedAt || item.invoiceCreatedAt));
}

function formatToNivoData(lineSeriesKey, groupedLineItems, yAxisField) {
  return {
    id: lineSeriesKey,
    data: _.map(groupedLineItems, (items, month) => ({ x: month, y: _.sumBy(items, yAxisField) })),
  };
}

function SalesReportGraph({ yAxisField, lineSeriesConfig, ...rest }) {
  const graphData = _.map(lineSeriesConfig, ({ id, data }) => formatToNivoData(id, groupLineItemsByMonth(data), yAxisField));

  let date = startOfYear(new Date());
  const tickValues = [...Array(12)].map(() => {
    const currentDate = date;
    date = addMonths(currentDate, 1);
    return getMonth(currentDate);
  });

  let commonLineGraphProps = {
    data: graphData,
    xScale: { min: tickValues[0], max: _.last(tickValues) },
    xFormat: monthNumToName, // for tooltip
  };

  const colors = _.map(lineSeriesConfig, 'color');
  if (colors && colors.length) {
    commonLineGraphProps.colors = colors; 
  }

  const commonBottomAxisProps = {
    format: monthNumToName, // for bottom axis names
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
            tickValues: takeNth(tickValues, 6)
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
            tickValues: takeNth(tickValues, 2),
          }}
          {...rest}
        />
      </div>

      {/* DESKTOP */}
      <div className='hidden xl:block h-full'>        
        <LineGraph
          {...commonLineGraphProps}
          axisBottom={{...commonBottomAxisProps}}
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
}

export default React.memo(SalesReportGraph);
