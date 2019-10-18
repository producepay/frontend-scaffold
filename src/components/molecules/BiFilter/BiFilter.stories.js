import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

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
    onChange={action('onChange')}
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
    onChange={action('onChange')}
  />
)).add('select some by default', () => (
  <Wrapper
    title="Commodity"
    items={[
      ...items,
      {
        label: "Apples",
        value: "Apples",
        subItems: [
          {
            label: "Fuji",
            value: "Fuji",
          },
          {
            label: "Golden",
            value: "Golden",
          },
        ],
      },
    ]}
    onChange={action('onChange')}
    defaultValues={{"Avocados": [], "Apples": ["Fuji"]}}
  />
)).add('no search', () => (
  <Wrapper
    title="Commodity"
    items={items}
    onChange={action('onChange')}
    showSearch={false}
  />
)).add('with subitems', () => (
  <Wrapper
    title="Commodity"
    items={[
      ...items,
      {
        label: "Apples",
        value: "Apples",
        subItems: [
          {
            label: "Fuji",
            value: "Fuji",
          },
          {
            label: "Golden",
            value: "Golden",
          },
        ],
      },
      {
        label: "Oranges",
        value: "Oranges",
        subItems: [
          {
            label: "Navel",
            value: "Navel",
          },
          {
            label: "Valencia",
            value: "Valencia",
          },
        ],
      },
    ]}
    onChange={action('onChange')}
    onSubItemsChange={action('onSubItemsChange')}
  />
));
