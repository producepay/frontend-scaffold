import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from '../../../routes';

import DetailHeader from '../../../components/molecules/DetailHeader';

import ShowCommodityPerformance from './ShowCommodityPerformance';
import ShowCommodityCustomers from './ShowCommodityCustomers';
import ShowCommodityTransactions from './ShowCommodityTransactions';
import ShowCommodityInsights from './ShowCommodityInsights';

function ShowCommodityView(props) {
  const { commodityName } = props;

  return (
    <React.Fragment>
      <DetailHeader
        title={commodityName}
        links={[
          { label: 'Sales Performance', to: routes.showCommoditySales(commodityName) },
          { label: 'Customers', to: routes.showCommodityCustomers(commodityName) },
          { label: 'Transactions', to: routes.showCommodityTransactions(commodityName) },
          { label: 'Market Insights', to: routes.showCommodityInsights(commodityName) },
        ]}
      />

      <Switch>
        <Route exact path={routes.showCommoditySales()} component={ShowCommodityPerformance} />
        <Route exact path={routes.showCommodityCustomers()} component={ShowCommodityCustomers} />
        <Route exact path={routes.showCommodityTransactions()} component={ShowCommodityTransactions} />
        <Route exact path={routes.showCommodityInsights()} component={ShowCommodityInsights} />

        <Redirect to={routes.showCommoditySales()} />
      </Switch>
    </React.Fragment>
  );
}

export default React.memo(ShowCommodityView);
