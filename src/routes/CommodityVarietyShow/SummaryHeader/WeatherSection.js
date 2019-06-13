import React from 'react';
import cx from 'classnames';
import pluralize from 'pluralize';

import AlertCircle from '../../../components/icons/AlertCircle';
import CheckmarkCircle from '../../../components/icons/CheckmarkCircle';

function WeatherSection(props) {
  const { alertsCount, dataAvailable } = props;
  const hasAlerts = alertsCount > 0;

  const alertCName = cx(
    'sm:w-1/5 px-4 lg:px-8 py-4 flex items-center justify-start sm:justify-center no-underline',
    {
      'bg-white text-red': hasAlerts,
    },
  );

  return (
    <a
      href="#weather-section"
      className={cx(alertCName, 'hidden cursor-pointer sm:flex')}
    >
      <div className="flex">
        <div className="flex items-center">
          {dataAvailable ?
            (hasAlerts ? (
              <AlertCircle className="mr-3" size={19} color="#E34848" />
            ) : (
              <CheckmarkCircle className="mr-3" size={19} color="#68B858" />
            )
          ) : null}
        </div>

        <span
          className={cx('text-sm-base font-medium leading-tight', {
            'text-red': hasAlerts,
          })}
        >
          {hasAlerts ?
            `${alertsCount} Weather ${pluralize('Alert', alertsCount)}`
            : dataAvailable ?
                'No Weather Alerts'
                : 'No Weather Data Available'
          }
        </span>
        <div>
          <span className="sm:hidden ml-4 text-primary uppercase text-xs no-underline font-medium">
            View
          </span>
        </div>
      </div>
    </a>
  );
}

export default React.memo(WeatherSection);
