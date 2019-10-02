import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import format from 'date-fns/format';
import eachDay from 'date-fns/each_day';
import subDays from 'date-fns/sub_days';
import { schemeCategory10 } from 'd3-scale-chromatic';
import cx from 'classnames';
import LineGraph from '../../../components/nivo/LineGraph';

import { orderByDateStr, takeNth } from '../../../helpers/lodash';
import { getUTCDate } from '../../../helpers/dates';
import { useWidth } from '../../../helpers/dom';
import { formatPrice } from '../../../helpers/format';

const formatDateNumber = (dateNumber) => format(new Date(dateNumber), 'MMM D');

function PriceLineGraph(props) {
  const { priceReportsForSku, activeItems, activeSku } = props;

  const { ref } = useWidth();

  const graphData = _.map(
    _.groupBy(priceReportsForSku, 'cityName'),
    (reports, cityName) => ({
      id: cityName,
      data: orderByDateStr(reports, 'reportDate', 'asc').map(r => ({
        x: +getUTCDate(r.reportDate),
        y: _.includes(activeItems, cityName) ? r.resolvedAveragePrice : null, // set hidden dataset y values to null
      })),
    }),
  );

  const tickValues = eachDay(subDays(new Date(), 30), new Date()).map(date => +date);

  const latestPricesPerShippingPoint = _.orderBy(_.map(graphData, (d, index) => ({
    cityName: d.id,
    price: _.last(d.data).y,
    reportDate: _.last(d.data).x,
    color: schemeCategory10[index % 10],
  })), 'price');

  const latestReportDate = _.max(_.map(latestPricesPerShippingPoint, 'reportDate'));

  const commonLineGraphProps = {
    data: graphData,
    xScale: { min: tickValues[0], max: _.last(tickValues) },
    xFormat: formatDateNumber,
    yUnit: "dollars",
  };

  const commonAxisBottomProps = {
    format: formatDateNumber,
    tickRotation: 30,
  };

  return (
    <React.Fragment>
      <div className="pb-4 md:pt-8 flex flex-col md:flex-row items-baseline">
        <div>
          <h2 className='text-xl'>{activeSku.label}</h2>
        </div>
        <div className='text-xs-sm text-gray-700 pl-0 pt-1 md:pt-0 md:pl-3'>
          As of {format(latestReportDate, 'MM/DD/YYYY')}
        </div>
      </div>
      <div className='flex pb-4 flex-col md:flex-row'>
        {latestPricesPerShippingPoint.map((data, index) => (
          <div
            key={data.cityName}
            className={cx(
              'pb-2 md:pb-0 md:flex-1 lg:w-1/5 leading-relaxed',
              { 'md:pr-12': index !== latestPricesPerShippingPoint.length - 1 },
            )}
          >
            <div className='text-xl pb-1'>
              {latestReportDate === data.reportDate ? formatPrice(data.price) : '--'}
            </div>
            <div className='text-xs font-medium' style={{color: data.color}}>{data.cityName}</div>
          </div>
        ))}
      </div>
      <div ref={ref} className='h-100'>
        {/* MOBILE */}
        <div className='sm:hidden h-full'>
          <LineGraph
            {...commonLineGraphProps}
            lineWidth={2}
            axisBottom={{
              ...commonAxisBottomProps,
              tickValues: takeNth(tickValues, 4)
            }}
          />
        </div>

        {/* TABLET */}
        <div className='hidden sm:block xl:hidden h-full'>
          <LineGraph
            {...commonLineGraphProps}
            axisBottom={{
              ...commonAxisBottomProps,
              tickValues: takeNth(tickValues, 2)
            }}
          />
        </div>

        {/* DESKTOP */}
        <div className='hidden xl:block h-full'>
          <LineGraph
            {...commonLineGraphProps}
            axisBottom={{
              ...commonAxisBottomProps,
              tickValues,
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

PriceLineGraph.propTypes = {
  priceReportsForSku: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  activeItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PriceLineGraph;
