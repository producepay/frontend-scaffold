import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import { getRoundedPercentage } from '../../../helpers/format';

import TooltipWrapper from '../../../components/elements/Nivo/TooltipWrapper';
import PercentageArrow from '../../../components/elements/PercentageArrow';

function TooltipContent(props) {
  const { className, label1, label2, value1, value2, percentageLabel } = props;

  const percentageChange = getRoundedPercentage(value2, value1, 1);

  const percentageCName = cx('flex items-center', {
    'text-primary': percentageChange > 0,
    'text-red': percentageChange < 0,
    'text-gray-700': percentageChange === 0,
  });

  return (
    <div className={cx('py-4 px-6 text-xs-sm text-center', className)}>
      <div className='flex pb-6'>
        <div className='w-1/2 pr-6'>
          <div className='pb-1 whitespace-no-wrap'>{label1}</div>

          <div className='text-2xl font-medium'>{value1 || '--'}</div>
        </div>

        <div className='w-px my-1 border-r' />

        <div className='w-1/2 pl-6'>
          <div className='pb-1 whitespace-no-wrap'>{label2}</div>

          <div className='text-2xl font-medium'>{value2 || '--'}</div>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <div className='pb-1'>{percentageLabel}</div>

        <div className={percentageCName}>
          <PercentageArrow value={percentageChange} />
          <span className='text-2xl font-medium'>{percentageChange}%</span>
        </div>
      </div>
    </div>
  );
}

export default function createTooltipRenderer(graphWidth, graphData) {
  return ({ slice }) => {
    const currentWeek = _.get(slice, 'points[0].data.xFormatted');

    const thisSeasonLoads = _.get(_.find(slice.points, { serieId: 'CURRENT SEASON' }), 'data.y');
    const lastSeasonLoads = _.get(_.find(slice.points, { serieId: 'LAST SEASON' }), 'data.y');

    const thisSeasonDataArr = _.find(graphData, { id: 'CURRENT SEASON' }).data;
    const thisWeekIdx = _.findIndex(thisSeasonDataArr, { x: currentWeek });
    const lastWeekObj = thisSeasonDataArr[thisWeekIdx - 1] || {};
    const lastWeek = lastWeekObj.x || (currentWeek === 1 ? 52 : currentWeek - 1);

    return (
      <TooltipWrapper
        title={`WEEK ${currentWeek}`}
        flipTooltipDisplay={slice.x > (graphWidth / 2)}
      >
        <TooltipContent
          className='border-b'
          label1={`Week ${lastWeek}`}
          label2={`Week ${currentWeek}`}
          value1={lastWeekObj.y}
          value2={thisSeasonLoads}
          percentageLabel='Week Over Week'
        />

        <TooltipContent
          label1='Last Season'
          label2='This Season'
          value1={lastSeasonLoads}
          value2={thisSeasonLoads}
          percentageLabel='Season Over Season'
        />
      </TooltipWrapper>
    );
  };
}
