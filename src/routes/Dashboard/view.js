import React from 'react';

import { Link } from 'react-router-dom';
import routes from '../../routes';

function DashboardView() {
  return (
    <div>
      <Link to={routes.showCommodity('1234')} className='block'>
        Click on Specific Commodity
      </Link>
      <Link to={routes.showCustomer('ACME Produce')} className='block'>
        Click on Specific Customer
      </Link>
    </div>
  );
}

export default React.memo(DashboardView);
