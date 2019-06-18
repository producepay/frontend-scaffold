import React from 'react';
import { isEmpty } from 'lodash';

import CardHeader from '../../../components/elements/CardHeader';
import EmptyDataSection from '../../../components/elements/EmptyDataSection';
import CheckmarkCircle from '../../../components/icons/CheckmarkCircle';
import WeatherTable from './table';

function WeatherInfoView(props) {
  const { data } = props;

  return isEmpty(data) ? (
    <EmptyDataSection title='Weather Alerts Not Available' anchor='weather-section' />
  ) : (
    <React.Fragment>
      <CardHeader
        anchorId='weather-section'
        title="Weather Alerts for the Next 7 Days"
        subtitle={
          <div className="flex pt-1">
            <div>
              <CheckmarkCircle size={18} color="#5CB65B" />
            </div>

            <div>&nbsp;&#61;&nbsp;no alerts to report</div>
          </div>
        }
        borderless
      />

      <div className="px-5 sm:px-8 pb-5 sm:pb-8">
        <WeatherTable data={data} />
      </div>
    </React.Fragment>
  );
}

export default WeatherInfoView;
