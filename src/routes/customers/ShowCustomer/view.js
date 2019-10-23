import React from 'react';
import { Switch, Route, Redirect, Link, NavLink } from 'react-router-dom';
import cx from 'classnames';

import routes from '../../../routes';

import ChevronLeft from '../../../components/icons/ChevronLeft';
import PerformanceDateFilter from '../../../components/molecules/PerformanceDateFilter';
import { BOTTOMLESS_SECTION_SPACING } from '../../../components/organisms/PerformanceDisplay/view';

import ShowCustomerPerformance from './ShowCustomerPerformance';
import ShowCustomerTransactions from './ShowCustomerTransactions';
import ShowCustomerSalesReport from './ShowCustomerSalesReport';

function ShowCustomerView(props) {
  const { customerId, customerName } = props;

  const links = [
    { label: 'Sales Performance', to: routes.showCustomerPerformance(customerId) },
    { label: 'Customers', to: routes.showCustomerTransactions(customerId) },
    { label: 'Sales Report', to: routes.showCustomerSalesReport(customerId) },
  ];

  return (
    <React.Fragment>
      <div className={`${BOTTOMLESS_SECTION_SPACING} border-b`}>
        <div className='flex justify-between items-center'>
          <div>
            <div className='mb-6 flex items-center'>
              <Link className='mr-6' to={routes.dashboard()}>
                <ChevronLeft className='text-primary' />
              </Link>

              <h3 className='font-medium text-4xl'>{customerName}</h3>
            </div>

            <div className='flex'>
              {links.map(({ label, to }, idx) => (
                <NavLink
                  key={label}
                  className={cx('py-4 font-medium text-center', {
                    'ml-8': idx !== 0,
                  })}
                  activeClassName='border-b-4 border-primary'
                  style={{ minWidth: 140 }}
                  to={to}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className='py-4 self-end'>
            <PerformanceDateFilter />
          </div>
        </div>
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
