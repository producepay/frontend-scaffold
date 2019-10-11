import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import routes from '../../../routes';

import ShowCustomerPerformance from './ShowCustomerPerformance';
import ShowCustomerTransactions from './ShowCustomerTransactions';
import ShowCustomerSalesReport from './ShowCustomerSalesReport';

function ShowCustomerView(props) {
  const { customerId } = props;

  return (
    <React.Fragment>
      <div>
        <Link to={routes.showCustomerPerformance(customerId)}>Sales Performance</Link>
        <Link to={routes.showCustomerTransactions(customerId)}>Customers</Link>
        <Link to={routes.showCustomerSalesReport(customerId)}>Sales Report</Link>
      </div>

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
