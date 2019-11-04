import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from '../routes';

import AuthSignIn from './auth/SignIn';

function Unauthenticated(props) {
  return (
    <Switch>
      <Route path={routes.authSignIn()} component={AuthSignIn} />

      <Redirect to={routes.authSignIn()} />
    </Switch>
  );
}

export default React.memo(Unauthenticated);
