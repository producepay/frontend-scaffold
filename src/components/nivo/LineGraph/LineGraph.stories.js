import React from 'react';

import { storiesOf } from '@storybook/react';

import LineGraph from './index';

storiesOf('Components/nivo/LineGraph', module)
.add('basic', () => (
  <LineGraph
    data={[
      { id: "Series A", data: [{ x: 0, y: 10 }, { x: 10, y: 10 }, { x: 20, y: 30 }] },
      { id: "Series B", data: [{ x: 0, y: 20 }, { x: 10, y: 10 }, { x: 20, y: 40 }] }
    ]}
  />
)).add('price', () => (
  <LineGraph
    yUnit="dollars"
    data={[
      { id: "Series A", data: [{ x: 0, y: 100.50 }, { x: 10, y: 120.00 }, { x: 20, y: 180.00 }] },
      { id: "Series B", data: [{ x: 0, y: 150.50 }, { x: 10, y: 115.00 }, { x: 20, y: 145.00 }] }
    ]}
  />
));
