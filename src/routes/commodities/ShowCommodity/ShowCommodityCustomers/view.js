import React from 'react';
import Card from '../../../../components/elements/Card';
import CustomersTable from './table';

function ShowCommodityCustomersView() {
  return (
    <Card className='p-4'>
      <CustomersTable />
    </Card>
  );
}

export default React.memo(ShowCommodityCustomersView);
