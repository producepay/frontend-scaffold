import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';
import _ from 'lodash';
import format from 'date-fns/format';
import eachDay from 'date-fns/each_day';
import subDays from 'date-fns/sub_days';
import { schemeCategory10 } from 'd3-scale-chromatic';
import cx from 'classnames';

import { orderByDateStr, takeNth } from '../../../helpers/lodash';
import { getUTCDate } from '../../../helpers/dates';
import { useWidth } from '../../../helpers/dom';
import { formatPrice } from '../../../helpers/format';

import Legend from '../../../components/elements/Nivo/Legend';
import TooltipWrapper from '../../../components/elements/Nivo/TooltipWrapper';

const formatDateNumber = (dateNumber) => format(new Date(dateNumber), 'MMM D');

function PriceLineGraph(props) {
  const { priceReportsForSku, activeItems, onChange } = props;

  const { ref, width } = useWidth();

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

  const shippingPoints = _.map(graphData, 'id');
  // note: schemeCategory10 only has 10 colors, so we wrap the index here
  const legendData = _.map(shippingPoints, (shippingPoint, index) => ({
    label: shippingPoint,
    color: schemeCategory10[index % 10],
  }));

  const allPrices = _.map(priceReportsForSku, 'resolvedAveragePrice');
  const maxPrice = _.max(allPrices);

  const latestPricesPerShippingPoint = _.map(graphData, (d, index) => ({
    cityName: d.id, price: _.last(d.data).y, color: schemeCategory10[index % 10],
  }));

  const commonLineGraphProps = {
    data: graphData,
    colors: { scheme: 'category10' },
    margin: { top: 4, right: 32, bottom: 40, left: 48 },
    xScale: { type: 'linear', min: tickValues[0], max: _.last(tickValues) },
    xFormat: formatDateNumber,
    yScale: { type: 'linear', stacked: false, min: 0, max: maxPrice * 1.3 },
    axisLeft: { format: value => formatPrice(value) },
    enableGridX: false,
    enableSlices: 'x',
    lineWidth: 3,
    animate: false,
    sliceTooltip: ({ slice }) => (
      <TooltipWrapper
        title={_.get(slice, 'points[0].data.xFormatted')}
        flipTooltipDisplay={slice.x > (width / 2)}
      >
        <table className='max-w-xs'>
          <tbody>
            {_.map(slice.points, (point, idx) => {
              const tooltipDataCN = cx('py-3 px-4 text-sm font-medium', {
                'border-t': idx !== 0,
              });

              return (
                <tr key={point.id}>
                  <td className={tooltipDataCN} style={{ color: point.serieColor }}>
                    {point.serieId}
                  </td>
                  <td className={tooltipDataCN}>
                    {formatPrice(point.data.yFormatted)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TooltipWrapper>
    ),
  };

  const commonAxisBottomProps = {
    format: formatDateNumber,
    tickRotation: 30,
  };

  return (
    <React.Fragment>
      <div className='flex flex-col md:flex-row'>
        {latestPricesPerShippingPoint.map(data => (
          <div className='pb-2 md:pb-0 md:flex-1 lg:w-1/5 leading-relaxed'>
            <div className='text-3xl'>{formatPrice(data.price)}</div>
            <div className='text-sm' style={{color: data.color}}>{data.cityName}</div>
          </div>
        ))}
      </div>
      <div ref={ref} className='h-100'>
        {/* MOBILE */}
        <div className='sm:hidden h-full'>
          <ResponsiveLine
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
          <ResponsiveLine
            {...commonLineGraphProps}
            axisBottom={{
              ...commonAxisBottomProps,
              tickValues: takeNth(tickValues, 2)
            }}
          />
        </div>

        {/* DESKTOP */}
        <div className='hidden xl:block h-full'>
          <ResponsiveLine
            {...commonLineGraphProps}
            axisBottom={{
              ...commonAxisBottomProps,
              tickValues,
            }}
          />
        </div>
      </div>

      <Legend
        selectable
        items={legendData}
        activeItems={activeItems}
        onChange={onChange}
      />
    </React.Fragment>
  );
}

PriceLineGraph.propTypes = {
  priceReportsForSku: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  activeItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PriceLineGraph;
