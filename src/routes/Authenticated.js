import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from '../routes';
import { FilterStateProvider } from '../contexts/FilterState';

import Dashboard from './Dashboard';
import MarketInsights from './market-insights/MarketInsights';
import ShowCustomer from './customers/ShowCustomer';
import ShowCommodity from './commodities/ShowCommodity';

function Authenticated(props) {
  return (
    <FilterStateProvider>
      <Switch>
        <Route exact path={routes.dashboard()} component={Dashboard} />
        <Route path={routes.marketInsights()} component={MarketInsights} />
        <Route path={routes.showCustomer()} component={ShowCustomer} />
        <Route path={routes.showCommodity()} component={ShowCommodity} />

        <Redirect to={routes.dashboard()} />
      </Switch>
    </FilterStateProvider>
  );
}

export default React.memo(Authenticated);
