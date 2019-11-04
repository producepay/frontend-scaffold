import React, { useContext, useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import _ from 'lodash';

import { identifyUser } from '../../helpers/tracking';
import useStorage from '../../hooks/use-storage';

const USER_KEY = 'auth-user';
const AUTH_TOKEN_KEY = 'auth-token';

const LOGIN = gql`
  mutation signInUser($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      token
      user {
        id
        email
        accessToken
        unsubscribedAt
      }
    }
  }
`;

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [loginRequest] = useMutation(LOGIN);

  const { children } = props;

  const [user, setUser] = useStorage(USER_KEY, {}, window.localStorage);
  const [authToken, setAuthToken] = useStorage(AUTH_TOKEN_KEY, null, window.localStorage);
  
  useEffect(() => {
    const email = _.get(user, 'email');
    if (email) identifyUser(email);
  }, [user]);

  function login(variables) {
    return loginRequest({ variables }).then(({ data: { signInUser } }) => {
      const { token: jwtToken, user } = signInUser;

      identifyUser(user.email);
      setUser(user);
      setAuthToken(jwtToken);
    });
  }

  function logout() {
    setUser({});
    window.localStorage.removeItem(USER_KEY);

    setAuthToken(null);
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!authToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export {
  AuthProvider,
  useAuth,
  AUTH_TOKEN_KEY,
};
