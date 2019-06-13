import React from 'react';
import format from 'date-fns/format';
import differenceInDays from 'date-fns/difference_in_days';
import cx from 'classnames';
import pluralize from 'pluralize';

import { getUTCDate } from '../../../helpers/dates';

import CardHeader from '../../../components/elements/CardHeader';
import EmptyDataSection from '../../../components/elements/EmptyDataSection';
import PricingTable from './pricing-table';

function PricingDetailsView(props) {
  const {
    commodityVarietyName,
    allReports,
    latestReportDate,
    latestReports,
    pricingMapUrl,
  } = props;

  const dateStr = format(getUTCDate(latestReportDate), 'M/D/YYYY');
  const daysBack = differenceInDays(new Date(), getUTCDate(latestReportDate));

  return latestReports.length > 0 ? (
    <React.Fragment>
      <CardHeader
        title="Aggregate Pricing by Shipping Point"
        subtitle={(
          <React.Fragment>
            <span className='pr-2 font-medium'>{commodityVarietyName} as of {dateStr}</span>

            <span className='text-grey-darker'>
              {daysBack > 0 ? `${pluralize('days', daysBack, true)} ago` : 'Today'}
            </span>
          </React.Fragment>
        )}
        className={cx('sm:block', {
          'hidden': latestReports.length === 0,
          'sm:hidden': !pricingMapUrl && latestReports.length === 0,
        })}
      />

      {pricingMapUrl ? (
        <div className="hidden sm:block py-8 px-5 border-b">
          <img
            className="block w-full max-w-lg mx-auto"
            src={pricingMapUrl}
            alt="Pricing Map"
          />
        </div>
      ) : null}

      {latestReports.length === 0 ? null : (
        <PricingTable
          allReports={allReports}
          latestReports={latestReports}
          latestReportDate={latestReportDate}
        />
      )}
    </React.Fragment>
  ) : (
    <EmptyDataSection
      title='Aggregate Pricing Not Available'
    />
  );
}

export default React.memo(PricingDetailsView);
