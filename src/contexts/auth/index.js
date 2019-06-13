import React, { useContext, useState, useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

import { identifyUser } from '../../helpers/tracking';

const AuthContext = React.createContext();

function AuthProvider(props) {
  const { location: { search }, children } = props;

  const { token, email } = qs.parse(search, { ignoreQueryPrefix: true });
  const [user] = useState({ token, email });

  useEffect(() => {
    identifyUser({ token, email });
  }, [token, email]);

  return (
    <AuthContext.Provider value={user}>
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
