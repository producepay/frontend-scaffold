import React from 'react';

import { useAuth } from '../../../contexts/auth';

import SignInView from './view';

export default () => {
  const { login } = useAuth();

  return (
    <SignInView login={login} />
  );
}
