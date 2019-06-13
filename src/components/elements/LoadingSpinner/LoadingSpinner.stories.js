import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import LoadingSpinner from './index';

storiesOf('Elements/LoadingSpinner', module)
  .add('basic', () =>
    <LoadingSpinner />
  )
  .add('spacing', () =>
    <LoadingSpinner spacing={8} />
  );
