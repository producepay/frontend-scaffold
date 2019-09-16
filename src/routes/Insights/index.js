import React from 'react';
import { useAuth } from '../../contexts/auth';

export default () => {
  const { setAuthToken, setAuthUser } = useAuth();

  return (
    <div className='p-8'>
      Welcome to insights!
      <div className='pt-4'>
        <button onClick={() => {
          window.localStorage.removeItem('authToken');
          setAuthToken(null);
          setAuthUser(null);
        }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}