import React from 'react';
import subMonths from 'date-fns/sub_months';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DateRangePicker from './index';

//// uses react-day-picker
storiesOf('Components/DateRangePicker', module)
.add('with default dates', () =>
  <DateRangePicker
    numberOfMonths={2}
    defaultFrom={subMonths(new Date(), 1)}
    defaultTo={new Date()}
  />
)
.add('with different start month', () =>
  <DateRangePicker
    numberOfMonths={2}
    month={subMonths(new Date(), 2)}
  />
)
.add('with future dates disabled', () =>
  <DateRangePicker
    numberOfMonths={2}
    month={subMonths(new Date(), 1)}
    disabledDays={{after: new Date()}}
    onRangeSelected={action('onRangeSelected')}
  />
).add('customize input component', () =>
  <DateRangePicker
    numberOfMonths={2}
    inputProps={{
      className: "w-64",
      color: "secondary",
    }}
  />
);
