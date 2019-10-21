import React from 'react';
import startOfYear from 'date-fns/start_of_year';
import endOfYear from 'date-fns/end_of_year';
import subMonths from 'date-fns/sub_months';

import DateRangePicker, { DEFAULT_PRESETS } from '../../elements/DateRangePicker';

function PerformanceDateFilter({ startDate, endDate, onRangeSelected, ...rest }) {
  return (
    <DateRangePicker
      onRangeSelected={onRangeSelected}
      defaultFrom={startDate}
      defaultTo={endDate}
      month={subMonths(new Date(), 1)}
      format="MMM DD YYYY"
      inputProps={{
        className: 'px-6',
      }}
      alignRight
      showWeekNumbers
      presets={[...DEFAULT_PRESETS, {
        label: "This Year",
        start: startOfYear(new Date()),
        end: endOfYear(new Date()),
      }]}
    />
  );
}

export default PerformanceDateFilter;
