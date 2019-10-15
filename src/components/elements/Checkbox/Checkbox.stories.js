import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import Checkbox from './index';

storiesOf('elements/Checkbox', module)
.add('small', () => (
  <Checkbox value="1" />
)).add('large', () => (
  <Checkbox value="1" size="large" />
));
