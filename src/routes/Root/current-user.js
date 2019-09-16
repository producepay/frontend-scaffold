import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useAuth } from '../../contexts/auth';

const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      user {
        id
      }
      errors
    }
  }
`

export default ({ render }) => {
  const { loading, error, data } = useQuery(CURRENT_USER);
  const { authUser, setAuthUser } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) return;
  
  if (!authUser && data && data.currentUser && data.currentUser.errors.length === 0) {
    setAuthUser(data.currentUser.user);
    return <div>Loading...</div>;
  }

  return render();
}
