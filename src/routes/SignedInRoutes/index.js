import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from '../../routes';

import CommodityVarietyShow from '../CommodityVarietyShow';
import Insights from '../Insights';

const SignedInRoutes = (props) => {
  return (
    <Switch>
      <Route path={routes.commodityVarietyShow()} component={CommodityVarietyShow} />
      <Route path='/insights' component={Insights} />

      <Redirect to='/insights'/>
    </Switch>
  );
}

export default React.memo(SignedInRoutes);
