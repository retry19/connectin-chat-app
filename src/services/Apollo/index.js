/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import { useAuth0 } from '@auth0/auth0-react';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import { useState } from 'react';
import { LinearProgress } from '@material-ui/core';

export default function Apollo(props) {
  const { children } = props;
  const { getIdTokenClaims, isLoading } = useAuth0();
  const [token, setToken] = useState('');

  if (isLoading) {
    return <LinearProgress />;
  }

  getIdTokenClaims().then((res) => {
    if (res) {
      setToken(res.__raw);
      // eslint-disable-next-line no-console
      console.log(token);
    }
  });

  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_WEBSOCKET,
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
    },
  });

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  });

  // get the authentication token from local cookie if it exists
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, splitLink]),
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}
