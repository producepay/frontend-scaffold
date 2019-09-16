import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from '../../routes';
import SignedInRoutes from '../SignedInRoutes';
import { useAuth } from '../../contexts/auth';

import CommodityVarietyShow from '../CommodityVarietyShow';
import SignIn from '../SignIn';

function RootView(props) {
  const { authUser } = useAuth();

  return props.isErrored ? (
    <div className='w-full md:max-w-md mx-auto p-6 md:p-8'>
      <h2 className='text-center text-3xl mb-6'>Uh oh!</h2>

      <div className='leading-relaxed text-center'>
        Looks like we've run into a problem! Our team has been alerted and we're working on getting a fix out. Thanks for your patience!
      </div>
    </div>
  ) : authUser && authUser.id ? <SignedInRoutes /> : (
      <Switch>
        <Route path={routes.commodityVarietyShow()} component={CommodityVarietyShow} />
        <Route path='/sign-in' component={SignIn} />

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
