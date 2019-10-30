import _ from 'lodash'
import { getPercentage } from './math';
import { getUTCDate } from './dates';
import { orderByDateStr } from './lodash';
import subWeeks from 'date-fns/sub_weeks';
import format from 'date-fns/format';
import isYesterday from 'date-fns/is_yesterday';
import { getRoundedPercentage } from './format';

const formatDateToString = date => format(date, 'YYYY-MM-DDT00:00:00[Z]');

export function getPriceAveragesForSku (reportsForSku, latestDate, dayBeforeDate, weekBeforeDate) {
  const { resolvedAveragePrice: mostRecentPrice } = _.find(reportsForSku, { reportDate: latestDate }) || {};
  const { resolvedAveragePrice: dayBeforePrice } = _.find(reportsForSku, { reportDate: dayBeforeDate }) || {};
  const { resolvedAveragePrice: weekBeforePrice } = _.find(reportsForSku, { reportDate: weekBeforeDate }) || {};

  return {
    dayOverDay: getPercentage(mostRecentPrice, dayBeforePrice),
    weekOverWeek: getPercentage(mostRecentPrice, weekBeforePrice),
  };
};

export function getPricingPercentagesAndDayBefore(priceReports) {
  const orderedReportDates = _.uniq(_.map(orderByDateStr(priceReports, 'reportDate'), 'reportDate'));

  const latestDate = orderedReportDates[0];
  const dayBeforeDate = orderedReportDates[1];
  const weekBefore = subWeeks(getUTCDate(latestDate), 1);
  const weekBeforeDate = weekBefore ? formatDateToString(weekBefore) : null;

  const skuKeyedReports = _.groupBy(priceReports, 'varietySkuName');
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

export function getMovementPercentages (thisYearMovement, lastYearMovement) {
  const orderedThisYearReports = orderByDateStr(thisYearMovement, 'reportDate');

  const thisWeekWeight = _.get(orderedThisYearReports, '[0].packageWeight');
  const lastWeekWeight = _.get(orderedThisYearReports, '[1].packageWeight');
  const lastYearWeight = _.get(lastYearMovement, '[0].packageWeight');

  return [
    getRoundedPercentage(thisWeekWeight, lastWeekWeight),
    getRoundedPercentage(thisWeekWeight, lastYearWeight),
  ];
};

export function getPricingDayLabel(pricingDayChange, dayBefore) {
  if (pricingDayChange === '--' || isYesterday(dayBefore)) return 'YESTERDAY';
  return format(dayBefore, 'dddd').toUpperCase();
};
