import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PageSpinner from './index';

storiesOf('Elements/PageSpinner', module)
  .add('basic', () =>
    <PageSpinner />
  );
