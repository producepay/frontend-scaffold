import React from 'react';

import { useAuth } from '../../contexts/auth';

import Authenticated from '../Authenticated';
import Unauthenticated from '../Unauthenticated';

function RootView(props) {
  const { isAuthenticated } = useAuth();

  return props.isErrored ? (
    <div className='w-full md:max-w-md mx-auto p-6 md:p-8'>
      <h2 className='text-center text-3xl mb-6'>Uh oh!</h2>

      <div className='leading-relaxed text-center'>
        Looks like we've run into a problem!
        Our team has been alerted and we're working on getting a fix out.
        Thanks for your patience!
      </div>
    </div>
  ) : (
    isAuthenticated ? (
      <Authenticated />
    ) : (
      <Unauthenticated />
    )
  );
}

export default React.memo(RootView);
