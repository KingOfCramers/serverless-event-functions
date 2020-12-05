import fetch from "cross-fetch";

import {
  InMemoryCache,
  createHttpLink,
  ApolloClient,
  NormalizedCacheObject,
} from "@apollo/client/core";

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const cache = new InMemoryCache();
  const link = createHttpLink({
    uri: process.env.GQL_URL,
    fetch,
  });

  const client = new ApolloClient({
    cache: cache,
    link: link,
  });

  return client;
};
