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
}];

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
)).add('limit 5 items', () => (
  <Wrapper
    title="Commodity"
    items={[
      ...items,
      {
        label: "Bell Peppers",
        value: "Bell Peppers",
      }, {
        label: "Squash",
        value: "Squash",
      }, {
        label: "Strawberries",
        value: "Strawberries",
      },
      {
        label: "Potatoes",
        value: "Potatoes",
      }, {
        label: "Celery",
        value: "Celery",
      }, {
        label: "Oranges",
        value: "Oranges",
      }
    ]}
  />
));
