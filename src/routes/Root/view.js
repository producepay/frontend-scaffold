import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from '../../routes';


import CommodityVarietyShow from '../CommodityVarietyShow';

function RootView(props) {
  return (
    <Switch>
      <Route path={routes.commodityVarietyShow()} component={CommodityVarietyShow} />

      <Redirect
        to={routes.commodityVarietyShow(
          'da4fd974-7c21-4b1d-adae-430d7f727d37',
          '6a9560f7-c940-4ab0-a61d-8d7b7fd044f0',
        )}
      />
    </Switch>
  );
}

export default React.memo(RootView);