import React from 'react';

import { storiesOf } from '@storybook/react';

import PageSpinner from './index';

storiesOf('Elements/PageSpinner', module)
  .add('basic', () =>
    <PageSpinner />
  );
