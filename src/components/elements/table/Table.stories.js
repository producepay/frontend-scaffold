import React from 'react';

import { storiesOf } from '@storybook/react';

import Table from './index';
import TH from './TH';

const MockTable = (tableProps) => (
  <Table {...tableProps}>
    <thead>
      <tr>
        <TH align="left">Name</TH>
        <TH>Quantity</TH>
        <TH>Amount</TH>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Frontera Produce</td>
        <td>120</td>
        <td>$19.52</td>
      </tr>
      <tr>
        <td>Fresh and Simple Produce</td>
        <td>105</td>
        <td>$17.30</td>
      </tr>
      <tr>
        <td>Amazon Produce</td>
        <td>142</td>
        <td>$16.99</td>
      </tr>
    </tbody>
  </Table>
);

storiesOf('Elements/Table', module)
.add('primary', () => (
  <MockTable />
)).add('secondary', () => (
  <MockTable color="secondary" />
)).add('secondary, large padding, with borders', () => (
  <MockTable
    color="secondary"
    padding="lg"
    alternatingRows={false}
    border="dotted"
  />
));;
