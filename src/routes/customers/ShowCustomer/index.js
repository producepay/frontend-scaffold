import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';

import ShowCustomerView from './view';
import BiLayout from '../../../components/organisms/BiLayout';

const FETCH_ERP_CUSTOMER = gql`
  query FetchErpCustomer($ids: [Int!]) {
    erpCustomers(ids: $ids) {
      name
    }
  }
`;

function ShowCustomer(props) {
  const { customerId } = props.match.params;
  const { data } = useQuery(FETCH_ERP_CUSTOMER, { variables: { ids: Number(customerId) } });

  return (
    <BiLayout>
      <ShowCustomerView
        customerId={customerId}
        customerName={_.get(data, 'erpCustomers[0].name')}
      />
    </BiLayout>
  );
}

export default React.memo(ShowCustomer);
