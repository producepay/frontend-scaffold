import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from '../routes';
import { FiltersProvider } from '../contexts/filters';

import Dashboard from './Dashboard';
import MarketInsights from './market-insights/MarketInsights';
import ShowCustomer from './customers/ShowCustomer';
import ShowCommodity from './commodities/ShowCommodity';
import Sidebar from './Sidebar';

const SIDEBAR_WIDTH = 220;

function Authenticated(props) {
  return (
    <FiltersProvider>
      <div className='flex'>
        <Sidebar />

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
    </FiltersProvider>
  );
}

export default React.memo(Authenticated);
