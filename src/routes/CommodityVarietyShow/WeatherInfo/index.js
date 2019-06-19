import React from 'react';
import _ from 'lodash';

import WeatherInfoView from './view';

function WeatherInfo(props) {
  const { growingRegions, commodityName } = props;

  const sortedGrowingRegions = _.sortBy(growingRegions, 'name');
  const weatherData = _.map(sortedGrowingRegions, (gr) => {
    const weatherAlertsAgg = {};

    _.forEach(gr.weatherForecasts, ({ weatherAlerts }) => {
      const uniqAlerts = _.uniqBy(weatherAlerts, 'alertType');

      _.forEach(uniqAlerts, ({ alertType }) => {
        weatherAlertsAgg[alertType] = (weatherAlertsAgg[alertType] || 0) + 1;
      });
    });

    return {
      name: gr.name,
      tempMax: _.max(_.map(gr.weatherForecasts, 'tempMax')),
      tempMin: _.min(_.map(gr.weatherForecasts, 'tempMin')),
      weatherAlertsAgg,
    };
  });

  return (
    <WeatherInfoView
      data={weatherData}
      commodityName={commodityName}
    />
  );
}

export default WeatherInfo;
