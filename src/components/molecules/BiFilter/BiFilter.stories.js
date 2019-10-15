import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import BiFilter from './index';

const items = [{
  label: "Avocados",
  value: "Avocados",
}, {
  label: "Cucumbers",
  value: "Cucumbers",
}, {
  label: "Tomatoes",
  value: "Tomatoes",
}
];

const Wrapper = (filterProps) => (
  <div className="w-56">
    <BiFilter {...filterProps} /> 
  </div>
)

storiesOf('Components/molecules/BiFilter', module)
.add('basic', () => (
  <Wrapper
    title="Commodity"
    items={items}
  />
));
