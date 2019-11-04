import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import _ from 'lodash';

import { AUTH_TOKEN_KEY } from './contexts/auth';

const backendLink = new HttpLink({
  uri: _.trim(process.env.REACT_APP_BACKEND_URL),
  headers: {},
});

const authLink = setContext((request, { headers }) => {
  const token = window.localStorage.getItem(AUTH_TOKEN_KEY);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export default new ApolloClient({
  link: authLink.concat(backendLink),
  cache: new InMemoryCache(),
});
