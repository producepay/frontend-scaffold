import { useState, useEffect } from 'react';

const useAuthStates = () => {
  const storedAuthToken = window.localStorage.getItem('authToken');
  const [authToken, setAuthToken] = useState(storedAuthToken);

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    window.localStorage.setItem('authToken', authToken);
  }, [authToken]);

  const signOut = () => {
    window.localStorage.removeItem('authToken');
    setAuthToken(null);
    setAuthUser(null);
  }

  return {
    authToken,
    setAuthToken,
    authUser,
    setAuthUser,
    signOut,
  };
}

export default useAuthStates;