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

export default ({ children }) => {
  const { loading, error, data } = useQuery(CURRENT_USER);
  const { authUser, setAuthUser } = useAuth();

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (!authUser && data && data.currentUser) {
    setAuthUser(data.currentUser);
  }

  return children;
}
