import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import routes from '../../../routes';

import ShowCommoditySales from './ShowCommoditySales';
import ShowCommodityCustomers from './ShowCommodityCustomers';
import ShowCommodityTransactions from './ShowCommodityTransactions';
import ShowCommodityInsights from './ShowCommodityInsights';

function ShowCommodityView(props) {
  const { commodityId } = props;

  return (
    <React.Fragment>
      <div>
        <Link to={routes.showCommoditySales(commodityId)}>Sales Performance</Link>
        <Link to={routes.showCommodityCustomers(commodityId)}>Customers</Link>
        <Link to={routes.showCommodityTransactions(commodityId)}>Transactions</Link>
        <Link to={routes.showCommodityInsights(commodityId)}>Market Insights</Link>
      </div>

      <Switch>
        <Route exact path={routes.showCommoditySales()} component={ShowCommoditySales} />
        <Route exact path={routes.showCommodityCustomers()} component={ShowCommodityCustomers} />
        <Route exact path={routes.showCommodityTransactions()} component={ShowCommodityTransactions} />
        <Route exact path={routes.showCommodityInsights()} component={ShowCommodityInsights} />

        <Redirect to={routes.showCommoditySales()} />
      </Switch>
    </React.Fragment>
  );
}

export default React.memo(ShowCommodityView);
