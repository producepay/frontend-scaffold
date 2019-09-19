import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useAuth } from '../../contexts/auth';

const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
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
  
  if (!authUser && data && data.currentUser) {
    setAuthUser(data.currentUser);
    return <div>Loading...</div>;
  }

  return render();
}
