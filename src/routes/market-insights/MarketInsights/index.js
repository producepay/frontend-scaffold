import React from 'react';

import ShowCommodityCustomersView from './view';
import BiLayout from '../../../components/organisms/BiLayout';

function ShowCommodityCustomers() {
  return (
    <BiLayout>
      <ShowCommodityCustomersView />
    </BiLayout>
  );
}

export default React.memo(ShowCommodityCustomers);
