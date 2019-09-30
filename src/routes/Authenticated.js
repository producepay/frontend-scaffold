import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import routes from '../routes';
import { useAuth } from '../contexts/auth';

import Dashboard from './Dashboard';
import MarketInsights from './market-insights/MarketInsights';
import ShowCustomer from './customers/ShowCustomer';
import ShowCommodity from './commodities/ShowCommodity';

function Authenticated(props) {
  const { logout } = useAuth();

  return (
    <div className='flex'>
      <div>
        <Link to={routes.dashboard()} className='block p-4'>
          Performance
        </Link>
        <Link to={routes.marketInsights()} className='block p-4'>
          Market Insights
        </Link>

        <div className='p-4 pointer' onClick={logout}>Log Out</div>
      </div>

      <div className='w-full'>
        <div className='p-4'>Search Bar</div>

        <div className='p-4'>
          <Switch>
            <Route exact path={routes.dashboard()} component={Dashboard} />
            <Route path={routes.marketInsights()} component={MarketInsights} />
            <Route path={routes.showCustomer()} component={ShowCustomer} />
            <Route path={routes.showCommodity()} component={ShowCommodity} />

            <Redirect to={routes.dashboard()} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Authenticated);
