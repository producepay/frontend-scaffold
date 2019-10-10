import React from 'react';

import { storiesOf } from '@storybook/react';

import DateRangePicker from './index';

storiesOf('Components/DateRangePicker2', module)
.add('basic', () => < DateRangePicker numberOfMonths={2} />);
