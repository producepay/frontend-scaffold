import React from 'react';
import TH from '../../../../components/elements/table/TH';

function CustomersTable() {
  const thProps = {
    bgColor: "white",
    color: "gray-600",
    size: "xs",
    className: "uppercase",
  };
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
          <tr>
            <td>Amazon Produce</td>
            <td>200</td>
            <td>$120,000</td>
            <td>$20,000</td>
            <td>$13.67</td>
            <td>$18.70</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(CustomersTable);
