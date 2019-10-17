import React, { useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth';

import routes from '../../../routes';

import MarketInsightsDashboard from './MarketInsightsDashboard';
import MarketInsightsAll from './MarketInsightsAll';

function MarketInsightsView() {
  const { user } = useAuth()
  const [isSubscribed, setIsSubscribed] = useState(user.unsubscribedAt)

  function toggleSubscription() {
    setIsSubscribed(!isSubscribed)
  }

  return (
    <React.Fragment>
      <div className='flex'>
        <div className='p-4'>Market Insights</div>
        <div className='p-4 cursor-pointer' onClick={toggleSubscription}>
          { isSubscribed ? 'Unsubscribe' : 'Subscribe' } to Emails
        </div>
      </div>
      <div>
        <Link className='p-4' to={routes.marketInsightsDashboard()}>Your Watch List</Link>
        <Link className='p-4' to={routes.marketInsightsAll()}>All</Link>
      </div>

      <Switch>
        <Route exact path={routes.marketInsightsDashboard()} render={() => <MarketInsightsDashboard foo={"bar"}/>} />
        <Route exact path={routes.marketInsightsAll()} component={MarketInsightsAll} />

        <Redirect to={routes.marketInsightsDashboard()} />
      </Switch>
    </React.Fragment>
  );
}

export default React.memo(MarketInsightsView);
