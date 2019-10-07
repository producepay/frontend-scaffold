import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import routes from '../routes';
import { useAuth } from '../contexts/auth';

import Dashboard from './Dashboard';
import MarketInsights from './market-insights/MarketInsights';
import ShowCustomer from './customers/ShowCustomer';
import ShowCommodity from './commodities/ShowCommodity';

import logo from '../assets/images/pp-logo.svg';

const SIDEBAR_WIDTH = 220;

function Authenticated(props) {
  const { logout } = useAuth();

  return (
    <div className='flex'>
      <div className='fixed' style={{ width: SIDEBAR_WIDTH }}>
        <div className='h-16 w-full py-4 px-8 border-b'>
          <img
            src={logo}
            alt="ProducePay"
          />
        </div>

        <Link to={routes.dashboard()} className='block p-4'>
          Performance
        </Link>
        <Link to={routes.marketInsights()} className='block p-4'>
          Market Insights
        </Link>

        <div className='p-4 pointer' onClick={logout}>Log Out</div>
      </div>

      <div className='w-full border-l bg-white min-h-screen' style={{ marginLeft: SIDEBAR_WIDTH }}>
        <div className='p-4 h-16 bg-white border-b'>
          Search Bar
        </div>

        <div className='bg-white'>
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
