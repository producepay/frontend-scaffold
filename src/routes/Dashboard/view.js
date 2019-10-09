import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import PageSpinner from '../../components/elements/PageSpinner';
import GraphsSection from './graphs-section';

function DashboardView({ loading, data, dateInterval, setDateInterval }) {
  const thisYearSalesOrderLineItems = _.get(data, 'thisYearSalesOrderLineItems', []);
  const lastYearSalesOrderLineItems = _.get(data, 'lastYearSalesOrderLineItems', []);

  return (
    <div>
      <Link to={routes.showCommodity('1234')} className='block'>
        Click on Specific Commodity
      </Link>
      <Link to={routes.showCustomer('ACME Produce')} className='block'>
        Click on Specific Customer
      </Link>
      {
        loading ?
          <PageSpinner /> :
          <GraphsSection
            thisYearSalesOrderLineItems={thisYearSalesOrderLineItems}
            lastYearSalesOrderLineItems={lastYearSalesOrderLineItems}
            dateInterval={dateInterval}
            setDateInterval={setDateInterval}
          />
      }
    </div>
  );
}

export default React.memo(DashboardView);
