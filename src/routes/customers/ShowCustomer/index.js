import React from 'react';

import ShowCustomerView from './view';

function ShowCustomer(props) {
  const { customerName } = props.match.params;

  return <ShowCustomerView customerName={customerName} />
}

export default React.memo(ShowCustomer);
