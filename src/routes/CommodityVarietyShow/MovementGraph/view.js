import React from 'react';
import _ from 'lodash';
import getISOWeek from 'date-fns/get_iso_week';
import subWeeks from 'date-fns/sub_weeks';
import endOfWeek from 'date-fns/end_of_week';
import format from 'date-fns/format';

import { orderByDateStr, takeNth } from '../../../helpers/lodash';
import { useWidth } from '../../../helpers/dom';
import createTooltipRenderer from './tooltip';

import { ResponsiveLine } from '@nivo/line';
import CardHeader from '../../../components/elements/CardHeader';
import Legend from '../../../components/elements/Nivo/Legend';
import EmptyDataSection from '../../../components/elements/EmptyDataSection';

const CURRENT_SEASON_KEY = 'CURRENT SEASON';
const CURRENT_SEASON_COLOR = '#5CB65B';
const LAST_SEASON_KEY = 'LAST SEASON';
const LAST_SEASON_COLOR = 'rgb(150, 150, 150)';
const WEEK_MARKER_COLOR = '#E34848';

const extractLoadsFromReport = report =>
  Math.round(_.get(report, 'packageWeight', 0) / 40000);

function getNivoDataConfig(currentYearReports, lastYearReports, startWeek) {
  if (currentYearReports.length === 0 && lastYearReports.length === 0) {
    return { tickValues: [], data: [] };
  }

  const currentReports = _.clone(currentYearReports);
  const lastReports = _.clone(lastYearReports);

  let weekNumber = startWeek;
  const currentSeasonData = [];
  const lastSeasonData = [];
  const tickValues = [];

  for (let i = 1; i <= 52; i++) {
    const currentReportsWeek = _.get(currentReports, '[0].week');
    const lastReportsWeek = _.get(lastReports, '[0].week');

    if (currentReportsWeek === weekNumber) {
      const weekReport = currentReports.shift();
      currentSeasonData.push({
        x: weekNumber,
        y: extractLoadsFromReport(weekReport),
      });
    } else {
      currentSeasonData.push({ x: weekNumber, y: null });
    }

    if (lastReportsWeek === weekNumber) {
      const weekReport = lastReports.shift();
      lastSeasonData.push({
        x: weekNumber,
        y: extractLoadsFromReport(weekReport),
      });
    } else {
      lastSeasonData.push({ x: weekNumber, y: null });
    }

    tickValues.push(weekNumber);
    weekNumber++;

    if (
      weekNumber > 52 &&
      currentReportsWeek !== 53 &&
      lastReportsWeek !== 53
    ) {
      if (weekNumber === 53) i--; // 53 week years would show one less data point
      weekNumber = 1;
    }
  }

  return {
    tickValues,
    data: [
      { id: CURRENT_SEASON_KEY, data: currentSeasonData },
      { id: LAST_SEASON_KEY, data: lastSeasonData },
    ],
  };
}

function MovementGraphView({ commodityName, startWeek, currentYearReports, lastYearReports }) {
  const { ref, width } = useWidth();

  const nivoDataConfig = getNivoDataConfig(
    orderByDateStr(currentYearReports, 'reportDate', 'asc'),
    orderByDateStr(lastYearReports, 'reportDate', 'asc'),
    startWeek,
  );

  // Raw data contains 44 weeks back, truncatedData only takes the last 43. This is so that we
  // can show the previous week in the tooltip
  const rawData = nivoDataConfig.data;
  const truncatedData = rawData.map((dataObj) => ({
    id: dataObj.id,
    data: dataObj.data.slice(1),
  }));

  const highestReport = _.maxBy(
    [...lastYearReports, ...currentYearReports],
    'packageWeight',
  );
  const maxY = extractLoadsFromReport(highestReport);
  const lastWeek = subWeeks(new Date(), 1);

  const commonGraphProps = {
    data: truncatedData,
    colors: [CURRENT_SEASON_COLOR, LAST_SEASON_COLOR],
    margin: { top: 8, right: 8, bottom: 40, left: 60 },
    yScale: { type: 'linear', stacked: false, min: 0, max: maxY * 1.05 },
    animate: false,
    enableGridX: false,
    enablePoints: false,
    lineWidth: 3,
    axisLeft: {
      legend: 'Loads (40K lbs)',
      legendOffset: -50,
      legendPosition: 'middle',
    },
    markers: [
      {
        axis: 'x',
        value: getISOWeek(lastWeek),
        lineStyle: { stroke: WEEK_MARKER_COLOR, strokeWidth: 4 },
      },
    ],
    enableSlices: 'x',
    sliceTooltip: createTooltipRenderer(width, rawData),
  };

  const commonAxisBottomProps = {
    legend: 'Week Number',
    legendPosition: 'middle',
    legendOffset: 32,
  };

  return truncatedData.length === 0 ? (
    <EmptyDataSection title='Movement Trends Not Available' anchor='movement-section' />
  ) : (
    <React.Fragment>
      <CardHeader
        anchorId='movement-section'
        title={
          commodityName
            ? `Movement Report for All ${commodityName} at All Locations`
            : 'Movement Reports'
        }
        subtitle="Data below includes only domestic and import movement. This graph shows a maximum of 43 weeks back and 8 weeks forward from the current week. All other data has been truncated for clarity."
      />

      <div className="py-4 md:py-8 px-6 md:px-8">
        <div ref={ref} className="h-100">
          <div className="sm:hidden h-full">
            <ResponsiveLine
              {...commonGraphProps}
              axisBottom={{
                ...commonAxisBottomProps,
                tickValues: takeNth(nivoDataConfig.tickValues, 4),
              }}
              lineWidth={2}
            />
          </div>

          <div className="hidden sm:block xl:hidden h-full">
            <ResponsiveLine
              {...commonGraphProps}
              axisBottom={{
                ...commonAxisBottomProps,
                tickValues: takeNth(nivoDataConfig.tickValues, 2),
              }}
            />
          </div>

          <div className="hidden xl:block h-full">
            <ResponsiveLine
              {...commonGraphProps}
              axisBottom={{
                ...commonAxisBottomProps,
                tickValues: nivoDataConfig.tickValues,
              }}
            />
          </div>
        </div>

        <Legend
          className="pt-2"
          items={[
            {
              label: CURRENT_SEASON_KEY.toUpperCase(),
              color: CURRENT_SEASON_COLOR,
            },
            {
              label: LAST_SEASON_KEY.toUpperCase(),
              color: LAST_SEASON_COLOR,
            },
            {
              label: `Week Ending ${format(
                endOfWeek(lastWeek, { weekStartsOn: 1 }),
                'MM/DD',
              )}`,
              color: WEEK_MARKER_COLOR,
            },
          ]}
        />
      </div>
    </React.Fragment>
  );
}

export default MovementGraphView;
