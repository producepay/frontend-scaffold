import React from 'react';
import TH from '../../../../components/elements/table/TH';
import { formatPrice, formatLoads } from '../../../../helpers/format';
import '../../../../components/elements/table/table.css';

const TH_PROPS = { align: 'left', weight: 'medium', size: 'xxs-xs' };

function CustomersTable({ groupedSalesOrderLineItems }) {
  return (
    <div>
      <table className="table-secondary table-alternating-rows table-p-sm w-full">
        <thead>
          <tr>
            <TH {...TH_PROPS}>Name</TH>
            <TH {...TH_PROPS}>Quantity Sold</TH>
            <TH {...TH_PROPS}>Sales Amount</TH>
            <TH {...TH_PROPS}>Total Profit</TH>
            <TH {...TH_PROPS}>Avg Cost Per Box</TH>
            <TH {...TH_PROPS}>Avg Sales Price Per Box</TH>
          </tr>
        </thead>
        <tbody>
          {
            groupedSalesOrderLineItems.map((item) => (
              <tr key={`${item.groupedValue}`}>
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
      </table>
    </div>
  );
}

export default React.memo(CustomersTable);
