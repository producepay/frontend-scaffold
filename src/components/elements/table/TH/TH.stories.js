import React from 'react';

import { storiesOf } from '@storybook/react';

import TH from './index';
import '../table.css';

const MockTable = ({ thNodes, ...tableProps }) => (
  <table {...tableProps}>
    <thead>
      {thNodes.map(th => (
        <TH {...th.props}>{th.label}</TH>
      ))}
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
  </table>
);

storiesOf('Elements/TH', module)
.add('default', () => (
  <MockTable
    className="table-secondary table-p-sm table-alternating-rows"
    thNodes={[
      { label: "Name", props: { align: "left" } },
      { label: "Quantity", props: {} },
      { label: "Amount", props: {} },
    ]}/>
)).add('with active', () => (
  <MockTable
    className="table-secondary table-alternating-rows table-p-lg table-border-th-solid"
    thNodes={[
      { label: "Name", props: { align: "left", active: true } },
      { label: "Quantity", props: {} },
      { label: "Amount", props: {} },
    ]}
  />
));
