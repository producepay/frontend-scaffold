import React from 'react';
import { get } from 'lodash';
import Card from '../../../../components/elements/Card';
import PageSpinner from '../../../../components/elements/PageSpinner';

import CustomersTable from './table';

function ShowCommodityCustomersView({ data, loading }) {
  if (loading) {
    return <PageSpinner />;
  }

  const groupedSalesOrderLineItems = get(data, 'groupedSalesOrderLineItems', []);

  return (
    <Card className='p-4'>
      <CustomersTable groupedSalesOrderLineItems={groupedSalesOrderLineItems} />
    </Card>
  );
}

export default React.memo(ShowCommodityCustomersView);
