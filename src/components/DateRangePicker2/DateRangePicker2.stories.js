import React from 'react';
import subMonths from 'date-fns/sub_months';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DateRangePicker from './index';

//// uses react-day-picker
storiesOf('Components/DateRangePicker2', module)
.add('picker with future dates disabled', () =>
  <DateRangePicker
    numberOfMonths={2}
    month={subMonths(new Date(), 1)}
    disabledDays={{after: new Date()}}
    onRangeSelected={action('onRangeSelected')}
  />
);
