import React from 'react';

import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';

import DateRangePicker from './index';

storiesOf('Components/DateRangePicker', module)
.add('basic', () => < DateRangePicker numberOfMonths={2} onDayClick={() => {actions('onDayChange'); console.log('hello');}} />);
