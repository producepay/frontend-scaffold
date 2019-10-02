import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import { ResponsiveLine } from '@nivo/line';
import TooltipWrapper from '../TooltipWrapper';
import { useWidth } from '../../../../helpers/dom';

const LineGraph = (props) => {
  const { ref, width } = useWidth();

  const defaultLineGraphProps = {
    colors: { scheme: 'category10' },
    margin: { top: 4, right: 32, bottom: 40, left: 48 },
    // xScale: { type: 'linear', min: tickValues[0], max: _.last(tickValues) },
    // yScale: { type: 'linear', stacked: false, min: 0, max: maxRevenue * 1.3 },
    // axisLeft: { format: value => formatPrice(value) },
    enableGridX: false,
    enableSlices: 'x',
    lineWidth: 3,
    animate: false,
    sliceTooltip: ({ slice }) => ( // default tooltip render function
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
                    {point.data.yFormatted}
                    {/* {formatPrice(point.data.yFormatted)} */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TooltipWrapper>
    ),
  };

  const finalProps = { ...defaultLineGraphProps, ...props }

  return (
    <div ref={ref} className='h-100'>
      <ResponsiveLine {...finalProps} />
    </div>
  )
}

export default LineGraph;