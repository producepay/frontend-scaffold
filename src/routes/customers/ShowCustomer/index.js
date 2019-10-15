import React from 'react';

import ShowCustomerView from './view';

function ShowCustomer(props) {
  const { customerId } = props.match.params;

  return <ShowCustomerView customerId={customerId} />
}

export default React.memo(ShowCustomer);
