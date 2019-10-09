import React from 'react';
import _ from 'lodash';

import { getPricingPercentagesAndDayBefore, getMovementPercentages } from '../../../helpers/summary-percentages'

import SummaryHeaderView from './view';

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
