import React from 'react';
import { useAuth } from '../../contexts/auth';
import routes from '../../routes';

export default ({ history }) => {
  const { setAuthToken, setAuthUser } = useAuth();

  return (
    <div className='p-8'>
      Welcome to insights!
      <div className='pt-4'>
        <button onClick={() => {
          // TODO: clean this up
          window.localStorage.removeItem('authToken');
          setAuthToken(null);
          setAuthUser(null);
          history.push(routes.commodityVarietyShow(
            'da4fd974-7c21-4b1d-adae-430d7f727d37',
            '6a9560f7-c940-4ab0-a61d-8d7b7fd044f0',
          ));
        }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}