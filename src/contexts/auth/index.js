import React, { useContext, useState, useEffect } from 'react';
import gql from 'graphql-tag';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { identifyUser } from '../../helpers/tracking';
import { useFilterState } from '../FilterState';

const AUTH_TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

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

const storeUser = (userObj) => window.localStorage.setItem(USER_KEY, JSON.stringify(userObj));
const getStoredUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem(USER_KEY));
  } catch (e) {
    return {};
  }
}

const AuthContext = React.createContext();

function AuthProvider(props) {
  const { setSessionFilters } = useFilterState();

  const [loginRequest] = useMutation(LOGIN);

  const { location: { search }, children } = props;
  const { token, email } = qs.parse(search, { ignoreQueryPrefix: true });

  const [unauthenticatedUser, setUnauthenticatedUser] = useState({ token, email });
  useEffect(() => {
    const userData = identifyUser({ token, email });
    setUnauthenticatedUser((prevUser) => ({ ...prevUser, ...userData }));
  }, [token, email]);

  const [user, setUser] = useState(getStoredUser());
  const [authToken, setAuthToken] = useState(window.localStorage.getItem(AUTH_TOKEN_KEY));

  function login(variables) {
    return loginRequest({ variables }).then(({ data: { signInUser } }) => {
      const { token: jwtToken, user } = signInUser;

      const unauthenticatedUserPayload = { token: user.accessToken, email: user.email };
      setUnauthenticatedUser(unauthenticatedUserPayload);
      identifyUser(unauthenticatedUserPayload);

      setUser(user);
      storeUser(user);

      setAuthToken(jwtToken);
      window.localStorage.setItem(AUTH_TOKEN_KEY, jwtToken);
    });
  }

  function logout() {
    setUser({});
    window.localStorage.removeItem(USER_KEY);

    setAuthToken(null);
    window.localStorage.removeItem(AUTH_TOKEN_KEY);

    setSessionFilters({});
  }

  return (
    <AuthContext.Provider
      value={{
        unauthenticatedUser,
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

const WrappedAuthProvider = withRouter(React.memo(AuthProvider));

export {
  WrappedAuthProvider as AuthProvider,
  useAuth,
  AUTH_TOKEN_KEY,
};
