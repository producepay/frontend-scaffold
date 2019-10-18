import React from 'react';

import { storiesOf } from '@storybook/react';

import Card from './index';

storiesOf('Elements/Card', module)
.add('basic', () => (
  <Card className='p-4 text-gray-800'>
    Hello World!
  </Card>
));
