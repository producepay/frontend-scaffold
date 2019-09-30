import React, { PureComponent } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FormLabel from './index';
import TextField from '../TextField';

storiesOf('Elements/FormLabel', module)
.addDecorator(story => (
  <div className='bg-white shadow p-4 mb-4'>{story()}</div>
))
.add('basic', () => (
  <FormLabel label='Test'>
    <TextField />
  </FormLabel>
))
.add('with errors', () => (
  <FormLabel label='Test' error='is required'>
    <TextField />
  </FormLabel>
));
