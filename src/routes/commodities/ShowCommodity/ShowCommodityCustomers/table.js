import React from 'react';
import Table from '../../../../components/elements/table';
import TH from '../../../../components/elements/table/TH';
import { formatPrice, formatLoads } from '../../../../helpers/format';

function CustomersTable({ groupedSalesOrderLineItems }) {
  const thProps = { align: 'left', weight: 'medium', size: 'xxs-xs' };

  return (
    <div>
      <Table color="secondary" className="w-full">
        <thead>
          <tr>
            <TH {...thProps}>Name</TH>
            <TH {...thProps}>Quantity Sold</TH>
            <TH {...thProps}>Sales Amount</TH>
            <TH {...thProps}>Total Profit</TH>
            <TH {...thProps}>Avg Cost Per Box</TH>
            <TH {...thProps}>Avg Sales Price Per Box</TH>
          </tr>
        </thead>
        <tbody>
          {
            groupedSalesOrderLineItems.map((item, index) => (
              <tr key={`row-${index}`}>
                <td>{item.groupedValue}</td>
                <td>{formatLoads(item.shipmentQuantity)}</td>
                <td>{formatPrice(item.totalSaleAmount, false)}</td>
                <td>{formatPrice(item.totalProfit, false)}</td>
                <td>{formatPrice(item.costOfGoods, false)}</td>
                <td>{formatPrice(item.salePricePerUnit, false)}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default React.memo(CustomersTable);
