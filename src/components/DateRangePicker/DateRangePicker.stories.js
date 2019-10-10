import React from 'react';

import { storiesOf } from '@storybook/react';

import DateRangePicker from './index';

//// uses react-dates
storiesOf('Components/DateRangePicker', module)
.add('basic', () => < DateRangePicker numberOfMonths={2} />);
