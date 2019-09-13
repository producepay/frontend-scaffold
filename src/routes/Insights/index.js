import React from 'react';
import { useAuth } from '../../contexts/auth';

export default () => {
  const { setAuthToken } = useAuth();

  return (
    <div className='p-8'>
      Welcome to insights!
      <div className='pt-4'>
        <button onClick={() => {
          localStorage.removeItem('authToken');
          setAuthToken(null);
        }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}