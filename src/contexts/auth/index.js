import React, { useContext, useState, useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

import { identifyUser } from '../../helpers/tracking';
import useAuthStates from '../../hooks/use-auth-states';

const AuthContext = React.createContext();

function AuthProvider(props) {
  const { location: { search }, children } = props;

  const { token, email } = qs.parse(search, { ignoreQueryPrefix: true });
  const [user, setUser] = useState({ token, email });

  useEffect(() => {
    const userData = identifyUser({ token, email });
    setUser(userData);
  }, [token, email]);

  // TODO: handle an expired token

  const context = {
    ...user,
    ...useAuthStates(),
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
