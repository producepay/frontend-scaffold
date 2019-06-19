import React from 'react';
import subWeeks from 'date-fns/sub_weeks';
import format from 'date-fns/format';
import _ from 'lodash';

import { getUTCDate } from '../../../helpers/dates';
import { orderByDateStr } from '../../../helpers/lodash';
import { getRoundedPercentage } from '../../../helpers/format';
import { getPercentage } from '../../../helpers/math';

import SummaryHeaderView from './view';

const formatDateToString = date => format(date, 'YYYY-MM-DDT00:00:00[Z]');

const getPriceAveragesForSku = (reportsForSku, latestDate, dayBeforeDate, weekBeforeDate) => {
  const { resolvedAveragePrice: mostRecentPrice } = _.find(reportsForSku, { reportDate: latestDate }) || {};
  const { resolvedAveragePrice: dayBeforePrice } = _.find(reportsForSku, { reportDate: dayBeforeDate }) || {};
  const { resolvedAveragePrice: weekBeforePrice } = _.find(reportsForSku, { reportDate: weekBeforeDate }) || {};

  return {
    dayOverDay: getPercentage(mostRecentPrice, dayBeforePrice),
    weekOverWeek: getPercentage(mostRecentPrice, weekBeforePrice),
  };
};

const getPricingPercentagesAndDayBefore = priceReports => {
  const orderedReportDates = _.uniq(_.map(orderByDateStr(priceReports, 'reportDate'), 'reportDate'));

  const latestDate = orderedReportDates[0];
  const dayBeforeDate = orderedReportDates[1];
  const weekBefore = subWeeks(getUTCDate(latestDate), 1);
  const weekBeforeDate = weekBefore ? formatDateToString(weekBefore) : null;

  const skuKeyedReports = _.groupBy(priceReports, 'skuName');
  const skuKeyedAverages = _.map(
    skuKeyedReports,
    (skuReports) => getPriceAveragesForSku(skuReports, latestDate, dayBeforeDate, weekBeforeDate),
  );

  const dayOverDayVals = _.reject(_.map(skuKeyedAverages, 'dayOverDay'), _.isNull);
  const weekOverWeekVals = _.reject(_.map(skuKeyedAverages, 'weekOverWeek'), _.isNull);

  return {
    pricingPercentages: [
      _.isEmpty(dayOverDayVals) ? '--' : _.round(_.mean(dayOverDayVals)),
      _.isEmpty(weekOverWeekVals) ? '--' : _.round(_.mean(weekOverWeekVals)),
    ],
    dayBefore: getUTCDate(dayBeforeDate),
  };
};

const getMovementPercentages = (thisYearMovement, lastYearMovement) => {
  const orderedThisYearReports = orderByDateStr(thisYearMovement, 'reportDate');

  const thisWeekWeight = _.get(orderedThisYearReports, '[0].packageWeight');
  const lastWeekWeight = _.get(orderedThisYearReports, '[1].packageWeight');
  const lastYearWeight = _.get(lastYearMovement, '[0].packageWeight');

  return [
    getRoundedPercentage(thisWeekWeight, lastWeekWeight),
    getRoundedPercentage(thisWeekWeight, lastYearWeight),
  ];
};

function SummaryHeader(props) {
  const {
    pricingData,
    thisYearMovementData,
    lastYearMovementData,
    growingRegionsData,
  } = props;

  const {
    pricingPercentages,
    dayBefore,
  } = getPricingPercentagesAndDayBefore(_.filter(pricingData, 'resolvedAveragePrice'));

  const movementPercentages = getMovementPercentages(thisYearMovementData, lastYearMovementData);

  const weatherDataAvailable = _.some(growingRegionsData, region => _.size(region.weatherForecasts));
  const alertsCount = growingRegionsData.reduce((total, region) => (
    total + _.reduce(region.weatherForecasts, (forecastTotal, forecast) => (
      forecastTotal + _.get(forecast, 'weatherAlerts', []).length
    ), 0)
  ), 0);

  return (
    <SummaryHeaderView
      pricingPercentages={pricingPercentages}
      dayBefore={dayBefore}
      movementPercentages={movementPercentages}
      weatherDataAvailable={weatherDataAvailable}
      alertsCount={alertsCount}
    />
  );
}

export default React.memo(SummaryHeader);
