import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Select from './index';

storiesOf('Elements/Select', module)
.add('basic', () => (
  <Select
    items={[
      { label: "Apples", value: "apples" },
      { label: "Bananas", value: "bananas" },
      { label: "Oranges", value: "oranges" },
    ]}
    onChange={action('onChange')}
  />
));
