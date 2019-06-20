import React from 'react';
import { isEmpty } from 'lodash';

import { useAuth } from '../../../contexts/auth';

import CardHeader from '../../../components/elements/CardHeader';
import CheckmarkCircle from '../../../components/icons/CheckmarkCircle';
import WeatherTable from './table';

function WeatherInfoView(props) {
  const { data, commodityName } = props;

  const { email = '' } = useAuth();

  const growingRegionsLink = (
    <a
      href={`https://docs.google.com/forms/d/e/1FAIpQLScmGsIpHe6DSBMfl2L2kz7eoZjlaeTB65IMfQLyrFkV66Ylsw/viewform?usp=pp_url&entry.1342184715=${commodityName}&entry.575011244=${email}`}
      className='block py-3 px-4 border border-primary rounded text-primary no-underline text-xs-sm leading-none text-center'
      target='_blank'
      rel='noopener noreferrer'
    >
      SUGGEST GROWING REGIONS
    </a>
  );

  return isEmpty(data) ? (
    <div className='py-5 sm:py-6 px-5 sm:px-8 flex flex-col items-center'>
      <div className='mb-4'>Want Weather Alerts for {commodityName}?</div>

      {growingRegionsLink}
    </div>
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
        actionItem={growingRegionsLink}
      />

      <div className="px-5 sm:px-8 pb-5 sm:pb-8">
        <WeatherTable data={data} />
      </div>
    </React.Fragment>
  );
}

export default WeatherInfoView;
