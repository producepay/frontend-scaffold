import React from 'react';
import format from 'date-fns/format';
import isYesterday from 'date-fns/is_yesterday';

import PercentagesWrapper from './PercentagesWrapper';
import WeatherSection from './WeatherSection';

const PERCENTAGE_CNAME = [
  'w-full sm:w-1/2 px-4 lg:px-8 py-4',
  'flex flex-row sm:flex-col lg:flex-row items-center sm:items-start justify-between',
  'border-b sm:border-b-0 sm:border-r',
].join(' ');

const getPricingDayLabel = (pricingDayChange, dayBefore) => {
  if (pricingDayChange === '--' || isYesterday(dayBefore)) return 'YESTERDAY';
  return format(dayBefore, 'dddd').toUpperCase();
};

function SummaryHeaderView(props) {
  const { pricingPercentages, dayBefore, movementPercentages, weatherDataAvailable, alertsCount } = props;

  const [pricingDayChange, pricingWeekChange] = pricingPercentages;
  const [movementDayChange, movementWeekChange] = movementPercentages;


  return (
    <header className="bg-white shadow relative flex flex-col sm:flex-row">
      <div className="w-full sm:w-4/5 block sm:flex">
        <a
          href="#price-trends-section"
          className={PERCENTAGE_CNAME}
        >
          <PercentagesWrapper
            label="Current Pricing"
            firstVal={pricingDayChange}
            firstLabel={getPricingDayLabel(pricingDayChange, dayBefore)}
            secondVal={pricingWeekChange}
            secondLabel="7 DAYS AGO"
          />
        </a>

        <a
          href="#movement-section"
          className={PERCENTAGE_CNAME}
        >
          <PercentagesWrapper
            label="Weekly Movement"
            firstVal={movementDayChange}
            firstLabel="LAST WEEK"
            secondVal={movementWeekChange}
            secondLabel="LAST YEAR"
          />
        </a>
      </div>

      <WeatherSection
        alertsCount={alertsCount}
        dataAvailable={weatherDataAvailable}
      />
    </header>
  );
}

export default React.memo(SummaryHeaderView);
