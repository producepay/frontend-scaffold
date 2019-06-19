import React from 'react';
import { isEmpty } from 'lodash';

import CardHeader from '../../../components/elements/CardHeader';
import CheckmarkCircle from '../../../components/icons/CheckmarkCircle';
import WeatherTable from './table';

function WeatherInfoView(props) {
  const { data, commodityName } = props;

  const mailtoSubject = `New Growing Regions for ${commodityName}`;
  const mailtoHref = `mailto:trading@producepay.com?subject=${mailtoSubject}`;

  return isEmpty(data) ? (
    <div className='py-5 sm:py-6 px-5 sm:px-8'>
      <div className='max-w-md mx-auto text-center leading-relaxed'>
        Want Weather Alerts for {commodityName}? Suggest growing regions by sending an email to <a href={mailtoHref} target='_blank' rel='noopener noreferrer'>trading@producepay.com</a>.
      </div>
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
        actionItem={(
          <a
            href={mailtoHref}
            className='block py-3 px-4 border rounded text-grey-darker no-underline text-xs-sm leading-none text-center'
            target='_blank'
            rel='noopener noreferrer'
          >
            SUGGEST GROWING REGIONS
          </a>
        )}
      />

      <div className="px-5 sm:px-8 pb-5 sm:pb-8">
        <WeatherTable data={data} />
      </div>
    </React.Fragment>
  );
}

export default WeatherInfoView;
