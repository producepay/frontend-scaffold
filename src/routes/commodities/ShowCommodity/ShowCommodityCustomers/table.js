import React from 'react';
import { formatPrice, formatLoads } from '../../../../helpers/format';

function CustomersTable() {
  const sampleData = [{
    id: "2391",
    name: "Frontera Produce",
    quantityOrdered: 155,
    totalSalesAmount: 95150.3,
    totalProfit: 40000.0,
    costPerBox: 12.95,
    avgSalesPerPox: 13.99,
  }, {
    id: "2392",
    name: "Del Monte Fresh Produce",
    quantityOrdered: 2134,
    totalSalesAmount: 125000,
    totalProfit: 20000,
    costPerBox: 14.95,
    avgSalesPerPox: 15.69,
  }, {
    id: "2393",
    name: "Fresh and Simple Produce",
    quantityOrdered: 550,
    totalSalesAmount: 105031,
    totalProfit: 24930,
    costPerBox: 13.40,
    avgSalesPerPox: 14.01,
  }];
  return (
    <div>
      <table className='secondary-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity Sold</th>
            <th>Sales Amount</th>
            <th>Total Profit</th>
            <th>Avg Cost Per Box</th>
            <th>Avg Sales Price Per Box</th>
          </tr>
        </thead>
        <tbody>
          {
            sampleData.map((d) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{formatLoads(d.quantityOrdered)}</td>
                <td>{formatPrice(d.totalSalesAmount, false)}</td>
                <td>{formatPrice(d.totalProfit, false)}</td>
                <td>{formatPrice(d.costPerBox, false)}</td>
                <td>{formatPrice(d.avgSalesPerPox, false)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(CustomersTable);
