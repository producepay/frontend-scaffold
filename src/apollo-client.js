import { ApolloLink } from 'apollo-link';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
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

export default new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === "insightsPlatform", // Routes the query to the proper client
    insightsPlatformLink,
    dataPlatformLink
  ),
  cache: new InMemoryCache(),
});
