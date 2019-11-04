import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from '../routes';

import Dashboard from './Dashboard';

function Authenticated(props) {
  return (
    <React.Fragment>
      <div>
        <Switch>
          <Route exact path={routes.dashboard()} component={Dashboard} />

          <Redirect to={routes.dashboard()} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default React.memo(Authenticated);
