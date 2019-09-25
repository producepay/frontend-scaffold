import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import routes from '../../../routes';

import MarketInsightsDashboard from './MarketInsightsDashboard';
import MarketInsightsAll from './MarketInsightsAll';

function MarketInsightsView() {
  return (
    <React.Fragment>
      <div>
        <Link to={routes.marketInsightsDashboard()}>Your Watch List</Link>
        <Link to={routes.marketInsightsAll()}>All</Link>
      </div>

      <Switch>
        <Route exact path={routes.marketInsightsDashboard()} component={MarketInsightsDashboard} />
        <Route exact path={routes.marketInsightsAll()} component={MarketInsightsAll} />

        <Redirect to={routes.marketInsightsDashboard()} />
      </Switch>
    </React.Fragment>
  );
}

export default React.memo(MarketInsightsView);
