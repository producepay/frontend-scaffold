import React from 'react';

import { storiesOf } from '@storybook/react';

import CardHeader from './index';
import Card from '../Card';

storiesOf('Elements/CardHeader', module)
.add('basic', () => (
  <Card>
    <CardHeader title="Asparagus" />
    <div className="p-4">Some content here</div>
  </Card>
))
.add('with subtitle', () => (
  <Card>
    <CardHeader
      title="Asparagus"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    />
    <div className="p-4">Some content here</div>
  </Card>
))
.add('inline', () => (
  <Card>
    <CardHeader
      title="Asparagus"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      inline
    />
    <div className="p-4">Some content here</div>
  </Card>
))
;
