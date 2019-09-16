import React from 'react';
import { useAuth } from '../../contexts/auth';

export default () => {
  const { signOut } = useAuth();

  return (
    <div className='p-8'>
      Welcome to insights!
      <div className='pt-4'>
        <button onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}