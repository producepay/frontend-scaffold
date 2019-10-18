import React from 'react';

import ShowCustomerView from './view';
import BiLayout from '../../../components/organisms/BiLayout';

function ShowCustomer(props) {
  const { customerId } = props.match.params;

  return (
    <BiLayout>
      <ShowCustomerView customerId={customerId} />
    </BiLayout>
  );
}

export default React.memo(ShowCustomer);
