import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Card from './index';

storiesOf('Elements/Card', module)
.add('basic', () => (
  <Card className='p-4 text-grey-darkest'>
    Hello World!
  </Card>
));
