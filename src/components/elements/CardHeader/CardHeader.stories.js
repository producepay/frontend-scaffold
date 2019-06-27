import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CardHeader from './index';
import Card from '../Card';
import Select from '../Select';

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
.add('with action item', () => (
  <Card>
    <CardHeader
      title="Asparagus"
      actionItem={(
        <Select
          items={[
            { label: "Green", value: "green" },
            { label: "White", value: "white" },
            { label: "Unspecified", value: "unspecified" },
          ]}
        onChange={action('onChange')}
        />
      )}
      actionItemClassName="pl-4"
    />
    <div className="p-4">Some content here</div>
  </Card>
))
;
