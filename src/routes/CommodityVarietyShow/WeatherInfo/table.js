import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { map, isEmpty, has } from 'lodash';

import getAlertDescription from './helpers';

import TH from '../../../components/elements/table/TH';
import AlertCircle from '../../../components/icons/AlertCircle';
import CheckmarkCircle from '../../../components/icons/CheckmarkCircle';

const TABLE_CELL_CLASSES = 'px-3 text-sm';
const ALERT_CELL_CLASS = 'text-red-600';

function displayAlerts(weatherAlertsAgg) {
  const alertsWithCount = map(weatherAlertsAgg, (numAlerts, alertType) => [alertType, numAlerts]);

  return alertsWithCount.map(([alertType, numAlerts], idx) => (
    <div key={alertType} className={cx(ALERT_CELL_CLASS, { 'mt-1': idx !== 0 })}>
      {getAlertDescription(alertType, numAlerts)}
    </div>
  ));
}

function WeatherTable(props) {
  const { data } = props;

  return (
    <table className='primary-table'>
      <thead>
        <tr>
          <TH align='left' colSpan='2'>Growing Regions</TH>
          <TH align='left' className='hidden md:table-cell'>Alerts</TH>
          <TH size='xs'>HIGHEST (F)</TH>
          <TH size='xs'>LOWEST (F)</TH>
        </tr>
      </thead>

      <tbody>
        {data.map((gr, index) => {
          const hasAlerts = !isEmpty(gr.weatherAlertsAgg);
          const bgClassName = cx({ 'bg-grey-100': index % 2 !== 0 });
          const computedClassName = cx(TABLE_CELL_CLASSES, bgClassName);
          const grNameClassName = cx('py-3 md:py-3 text-sm', bgClassName)

          return (
            <React.Fragment key={gr.name}>
              <tr>
                <td className={cx(bgClassName, 'px-3')}>
                  <div className='flex items-center'>
                    {hasAlerts ? (
                      <AlertCircle size={17} color='#CC1F1A' />
                    ) : (
                      <CheckmarkCircle size={17} color='#68B858' />
                    )}
                  </div>
                </td>

                <td align='left' valign='middle' className={grNameClassName}>
                  {gr.name}
                </td>

                <td
                  valign='middle'
                  className={cx(computedClassName, 'hidden md:table-cell py-3')}
                >
                  {displayAlerts(gr.weatherAlertsAgg)}
                </td>

                <td
                  valign='middle'
                  align='center'
                  className={cx(computedClassName, {
                    [`${ALERT_CELL_CLASS} font-medium`]: has(gr.weatherAlertsAgg, 'high_temperature'),
                  })}
                >
                  {gr.tempMax ? Math.round(gr.tempMax) : '--'}
                </td>

                <td
                  valign='middle'
                  align='center'
                  className={cx(computedClassName, {
                    [`${ALERT_CELL_CLASS} font-medium`]: has(gr.weatherAlertsAgg, 'low_temperature'),
                  })}
                >
                  {gr.tempMin ? Math.round(gr.tempMin) : '--'}
                </td>
              </tr>

              <tr className={`md:hidden ${hasAlerts ? 'table-row' : 'hidden'}`}>
                <td colSpan='5' className={cx(bgClassName, 'pl-10 pr-3 pb-3 text-sm')}>
                  {displayAlerts(gr.weatherAlertsAgg)}
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

WeatherTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    tempMax: PropTypes.number,
    tempMin: PropTypes.number,
    weatherAlertsAgg: PropTypes.object,
  })),
};

export default WeatherTable;
