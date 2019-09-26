import React, { useContext, useState, useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

import { identifyUser } from '../../helpers/tracking';

const AuthContext = React.createContext();

function AuthProvider(props) {
  const { location: { search }, children } = props;

  const { token, email } = qs.parse(search, { ignoreQueryPrefix: true });
  const [user, setUser] = useState({ token, email, isAuthenticated: true });

  const storedAuthToken = window.localStorage.getItem('authToken');
  const [authToken, setAuthToken] = useState(storedAuthToken);

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const userData = identifyUser({ token, email });
    setUser({ ...user, ...userData });
  }, [token, email]);

  useEffect(() => {
      window.localStorage.setItem('authToken', authToken);
  }, [authToken]);

  // TODO: how to handle expired token?

  const context = {
    ...user,
    authToken,
    setAuthToken,
    authUser,
    setAuthUser,
  };

  return (
    <AuthContext.Provider value={context}>
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
  useAuth
};
