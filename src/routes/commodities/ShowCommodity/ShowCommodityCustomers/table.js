import React from 'react';
import TH from '../../../../components/elements/table/TH';
import TD from '../../../../components/elements/table/TD';

function CustomersTable() {
  const sampleData = [{
    id: "2391",
    name: "Frontera Produce",
    quantityOrdered: 155,
    totalSalesAmount: "$95,000",
    totalProfit: "$40,000",
    costPerBox: "$12.95",
    avgSalesPerPox: "13.99",
  }, {
    id: "2392",
    name: "Del Monte Fresh Produce",
    quantityOrdered: 2134,
    totalSalesAmount: "$125,000",
    totalProfit: "$20,000",
    costPerBox: "$14.95",
    avgSalesPerPox: "15.69",
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
                <td>{d.quantityOrdered}</td>
                <td>{d.totalSalesAmount}</td>
                <td>{d.total}</td>
                <td>{d.name}</td>
                <td>{d.name}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(CustomersTable);
