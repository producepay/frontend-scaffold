import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import PageSpinner from '../../components/elements/PageSpinner';
import GraphsSection from './graphs-section';

function DashboardView({ loading, data, dateInterval, setDateInterval }) {
  const thisYearSalesOrderLineItems = _.get(data, 'thisYearSalesOrderLineItems', []);
  const lastYearSalesOrderLineItems = _.get(data, 'lastYearSalesOrderLineItems', []);

  return loading ? (
    <PageSpinner />
  ) : (
    <div className=''>
      <GraphsSection
        thisYearSalesOrderLineItems={thisYearSalesOrderLineItems}
        lastYearSalesOrderLineItems={lastYearSalesOrderLineItems}
        dateInterval={dateInterval}
        setDateInterval={setDateInterval}
      />

      <div className='bg-white border-b'>

      </div>
    </div>
  );
}

export default React.memo(DashboardView);
