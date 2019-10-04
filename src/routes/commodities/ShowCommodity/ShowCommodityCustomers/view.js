import React from 'react';
import CustomersTable from './table';

function ShowCommodityCustomersView() {
  return (
    <div>
      <h2>ShowCommodityCustomersView</h2>
      <CustomersTable />
    </div>
  );
}

export default React.memo(ShowCommodityCustomersView);
