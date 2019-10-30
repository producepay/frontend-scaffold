import React, { useState } from 'react';
import { interpolateYlGn } from 'd3-scale-chromatic';
import { storiesOf } from '@storybook/react';

import Legend from './index';

const LEGEND_ITEMS = [
  { label: "Apples", color: interpolateYlGn(0.75) },
  { label: "Bananas", color: interpolateYlGn(0.5) },
  { label: "Oranges", color: interpolateYlGn(1) },
];

function LegendContainer() {
  const items = LEGEND_ITEMS;

  const [activeItems, setActiveItem] = useState(["Apples", "Bananas", "Oranges"]);

  return (
    <Legend
      selectable
      items={items}
      activeItems={activeItems}
      onChange={(value) => setActiveItem(value)}
    />
  )
};

storiesOf('Elements/Legend', module)
.add('basic', () => (
  <Legend
    items={LEGEND_ITEMS}
  />
))
.add('column', () => (
  <div style={{ height: 300, width: 300 }}>
    <Legend
      items={LEGEND_ITEMS}
      flexDirection="column"
    />
  </div>
))
.add('different label color', () => (
  <Legend
    items={LEGEND_ITEMS.map(item => ({ label: item.label, color: item.color, labelColor: '#333333' }))}
  />
))
.add('selectable', () => <LegendContainer />);
