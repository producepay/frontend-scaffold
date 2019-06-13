import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Grid from './index';

storiesOf('Elements/Grid', module)
.add('basic', () => (
  <Grid container>
    <Grid>
      <div style={{ height: 100, background: '#4286f4' }} />
    </Grid>

    <Grid>
      <div style={{ height: 100, background: '#f44141' }} />
    </Grid>
  </Grid>
))
.add('horizontal split', () => (
  <Grid container>
    <Grid sm='1/2'>
      <div style={{ height: 100, background: '#4286f4' }} />
    </Grid>

    <Grid sm='1/2'>
      <div style={{ height: 100, background: '#f44141' }} />
    </Grid>
  </Grid>
))
.add('responsize', () => (
  <Grid container>
    <Grid sm='full' md='1/2' lg='1/3' xl='1/4'>
      <div style={{ height: 100, background: '#4286f4' }} />
    </Grid>

    <Grid sm='full' md='1/2' lg='1/3' xl='1/4'>
      <div style={{ height: 100, background: '#f44141' }} />
    </Grid>
  </Grid>
));
