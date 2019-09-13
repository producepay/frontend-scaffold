import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import SignInView from './view';
import { useAuth } from '../../contexts/auth';

const SIGN_IN = gql`
  mutation signInUser($user: AuthProviderInput!) {
    signInUser(user: $user) {
      token
      user {
        id
      }
    }
  }
`

export default ({ history }) => {
  const [signIn, { data }] = useMutation(SIGN_IN);
  const { setAuthToken } = useAuth();

  if (data) {
    const { signInUser: { token, user } } = data;
    setAuthToken(token);
    if (user.id) {
      history.push('/insights');
    }
  }

  return (
    <SignInView handleSubmit={(data) => signIn({variables: { user: { ...data } }})} />
  );
}