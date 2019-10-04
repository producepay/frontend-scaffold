import React from 'react';
import TH from '../../../../components/elements/table/TH';
import TD from '../../../../components/elements/table/TD';

function CustomersTable() {
  const thProps = {
    bgColor: "white",
    color: "gray-600",
    size: "xs",
    className: "uppercase",
  };
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
      <table>
        <thead>
          <TH {...thProps}>Name</TH>
          <TH {...thProps}>Quantity Sold</TH>
          <TH {...thProps}>Sales Amount</TH>
          <TH {...thProps}>Total Profit</TH>
          <TH {...thProps}>Avg Cost Per Box</TH>
          <TH {...thProps}>Avg Sales Price Per Box</TH>
        </thead>
        <tbody>
          {
            sampleData.map((d) => (
              <tr key={d.id}>
                <TD>{d.name}</TD>
                <TD>{d.quantityOrdered}</TD>
                <TD>{d.totalSalesAmount}</TD>
                <TD>{d.total}</TD>
                <TD>{d.name}</TD>
                <TD>{d.name}</TD>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(CustomersTable);
