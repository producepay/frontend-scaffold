import React, { useState, useCallback } from 'react';
import _ from 'lodash';

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

const ControlledFilter = (filterProps) => {
  const [filters, setFilters] = useState(filterProps.values || []);

  const handleOnChange = useCallback((item, subItem) => {
    const parentItem = _.find(filters, i => i.value === item.value);
    if (subItem) { // if child item clicked
      if (parentItem) {
        const existingChild = _.find(parentItem.subItems, i => i.value === subItem.value);
        if (existingChild) {
          if (parentItem.subItems.length === 1) { // remove parent as well
            setFilters(_.filter(filters, i => i.value !== item.value));
          } else { // remove subitem only
            const newParentItem = {
              ...parentItem,
              subItems: _.filter(parentItem.subItems, (child) => child.value !== subItem.value)
            };
            setFilters([..._.filter(filters, i => i.value !== parentItem.value), newParentItem]);
          }
        } else { // add subitem
          const newParentItem = { ...parentItem, subItems: [...parentItem.subItems, subItem ] };
          setFilters([..._.filter(filters, i => i.value !== parentItem.value), newParentItem]);
        }
      } else { // add parent with subitem
        const newParentItem = { ...item, subItems: [subItem] };
        setFilters([ ...filters, newParentItem ]);
      }
    } else { // parent item clicked
      if (parentItem) { // need to remove parent item
        setFilters(_.filter(filters, i => i.value !== item.value));
      } else { // add parent item
        setFilters([ ...filters, item ]);
      }
    }
  }, [filters, setFilters]);

  return (
    <div className="w-56">
      <BiFilter {...filterProps} values={filters} onChange={handleOnChange} /> 
    </div>
  );
}

storiesOf('Components/molecules/BiFilter', module)
.add('basic', () => (
  <ControlledFilter
    title="Commodity"
    items={items}
  />
)).add('limit 5 items', () => (
  <ControlledFilter
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
)).add('select some by default', () => (
  <ControlledFilter
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
    values={[
      {
        label: "Avocados",
        value: "Avocados",
      },
      {
        label: "Apples",
        value: "Apples",
        subItems: [
          {
            label: "Fuji",
            value: "Fuji",
          },
        ],
      },
    ]}
  />
)).add('no search', () => (
  <ControlledFilter
    title="Commodity"
    items={items}
    showSearch={false}
  />
)).add('with subitems', () => (
  <ControlledFilter
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
  />
));
