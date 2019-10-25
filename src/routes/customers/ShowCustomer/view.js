import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from '../../../routes';

import DetailHeader from '../../../components/molecules/DetailHeader';

import ShowCustomerPerformance from './ShowCustomerPerformance';
import ShowCustomerTransactions from './ShowCustomerTransactions';
import ShowCustomerSalesReport from './ShowCustomerSalesReport';

function ShowCustomerView(props) {
  const { customerId, customerName } = props;

  return (
    <React.Fragment>
      <DetailHeader
        title={customerName}
        links={[
          { label: 'Sales Performance', to: routes.showCustomerPerformance(customerId) },
          { label: 'Customers', to: routes.showCustomerTransactions(customerId) },
          { label: 'Sales Report', to: routes.showCustomerSalesReport(customerId) },
        ]}
      />

      <Switch>
        <Route exact path={routes.showCustomerPerformance()} component={ShowCustomerPerformance} />
        <Route exact path={routes.showCustomerTransactions()} component={ShowCustomerTransactions} />
        <Route exact path={routes.showCustomerSalesReport()} component={ShowCustomerSalesReport} />

        <Redirect to={routes.showCustomerPerformance()} />
      </Switch>
    </React.Fragment>
  );
}

export default React.memo(ShowCustomerView);
