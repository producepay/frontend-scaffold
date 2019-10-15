import React from 'react';
import subMonths from 'date-fns/sub_months';
import addMonths from 'date-fns/add_months';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DateRangePicker from './index';

//// uses react-day-picker
storiesOf('Components/DateRangePicker', module)
.add('with default dates', () =>
  <DateRangePicker
    defaultFrom={subMonths(new Date(), 1)}
    defaultTo={new Date()}
  />
)
.add('with different start month', () =>
  <DateRangePicker
    numberOfMonths={1}
    month={subMonths(new Date(), 2)}
  />
)
.add('with future dates disabled', () =>
  <DateRangePicker
    month={subMonths(new Date(), 1)}
    disabledDays={{after: new Date()}}
    onRangeSelected={action('onRangeSelected')}
  />
).add('customize input component', () =>
  <DateRangePicker
    inputProps={{
      className: "w-64",
      color: "secondary",
    }}
  />
).add('with different presets', () =>
  <DateRangePicker
    presets={[
      {
        label: "This Month",
        start: startOfMonth(new Date()),
        end: endOfMonth(new Date()),
      },
      {
        label: "Next Month",
        start: startOfMonth(addMonths(new Date(), 1)),
        end: endOfMonth(addMonths(new Date(), 1)),
      },
    ]}
  />
).add('align right', () =>
  <DateRangePicker alignRight />
);
