import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import routes from '../../../routes';

import ShowCustomerPerformance from './ShowCustomerPerformance';
import ShowCustomerTransactions from './ShowCustomerTransactions';
import ShowCustomerSalesReport from './ShowCustomerSalesReport';

const CustomerRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={routeProps => (
      <Component {...routeProps} {...rest} />
    )}
  />
)

function ShowCustomerView(props) {
  const { customerName, ...rest } = props;

  return (
    <React.Fragment>
      <div>
        <Link to={routes.showCustomerPerformance(customerName)}>Sales Performance</Link>
        <Link to={routes.showCustomerTransactions(customerName)}>Customers</Link>
        <Link to={routes.showCustomerSalesReport(customerName)}>Sales Report</Link>
      </div>

      <Switch>
        <CustomerRoute exact path={routes.showCustomerPerformance()} component={ShowCustomerPerformance} {...rest} />
        <CustomerRoute exact path={routes.showCustomerTransactions()} component={ShowCustomerTransactions} {...rest} />
        <CustomerRoute exact path={routes.showCustomerSalesReport()} component={ShowCustomerSalesReport} {...rest} />

        <Redirect to={routes.showCustomerPerformance()} />
      </Switch>
    </React.Fragment>
  );
}

export default React.memo(ShowCustomerView);
