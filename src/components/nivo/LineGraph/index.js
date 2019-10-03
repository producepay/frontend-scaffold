import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'classnames';
import { ResponsiveLine } from '@nivo/line';
import TooltipWrapper from '../../elements/Nivo/TooltipWrapper';
import { useWidth } from '../../../helpers/dom';
import { formatPrice, formatLargeLoads } from '../../../helpers/format';

const LineGraph = ({ yUnit, tickValues, ...rest }) => {
  const { width } = useWidth();
  const { data } = rest;

  const maxPoint = _.maxBy(_.flatten(_.map(data, 'data')), 'y');

  const defaultLineGraphProps = {
    colors: { scheme: 'category10' },
    margin: { top: 4, right: 32, bottom: 40, left: 48 },
    xScale: { type: 'linear' },
    yScale: { type: 'linear', stacked: false, min: 0, max: _.get(maxPoint, 'y', 0) * 1.15 },
    axisLeft: yUnit === "dollars" ? { format: value => formatPrice(value) } : { format: formatLargeLoads },
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
                    {yUnit === "dollars" ? formatPrice(point.data.yFormatted) : point.data.yFormatted}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TooltipWrapper>
    ),
    axisBottom: {
      legendPosition: 'middle',
      legendOffset: 32,
    },
  };

  const finalProps = _.merge(defaultLineGraphProps, rest); // deep merge

  return <ResponsiveLine {...finalProps} />;
}

LineGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      data: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
          y: PropTypes.number,
        })
      ),
    }),
  ).isRequired,
  yUnit: PropTypes.oneOf(["dollars", "loads"]), // most graphs y-axis are either volume (loads), or dollars
};

LineGraph.defaultProps = {
  yUnit: "loads",
};

export default LineGraph;