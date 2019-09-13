import { ApolloLink } from 'apollo-link';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import _ from 'lodash';

////// NOTE: Since we have 2 different APIs to connect to:
////// To query insights/email platform backend, we must specifiy the client name using context.
////// The default client is dataPlatform.
////// const {data, error, loading} = useQuery(FETCH_MY_STUFF, {
//////   context: { clientName: "insightsPlatform" }
////// });

const dataPlatformLink = new HttpLink({
  uri: _.trim(process.env.REACT_APP_DATA_PLATFORM_URL),
  headers: {},
});

const insightsPlatformLink = new HttpLink({
  uri: _.trim(process.env.REACT_APP_EMAIL_PLATFORM_URL),
  headers: {},
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('authToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export default new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === "insightsPlatform", // Routes the query to the proper client
    insightsPlatformLink,
    authLink.concat(dataPlatformLink)
  ),
  cache: new InMemoryCache(),
});
