import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context/index.js";
import { performRequest } from "@/src/features/shared/utils/performFetchRequest.js";

const apiUrl = import.meta.env.VITE_API_URL;

const customFetch = async (uri, options) => {
  return performRequest({
    uri,
    options,
    retry: true,
  });
};

const httpLink = createHttpLink({
  uri: `${apiUrl}/graphql/auth`,
  credentials: "include",
  fetch: customFetch,
});

const cache = new InMemoryCache({
  addTypename: false,
});

const authLink = setContext((_, { headers }) => {
  return {
    credentials: "include",
    headers: {
      ...headers,
      "Accept": "application/json",
    },
  };
});

const authClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    mutate: {
      fetchPolicy: "no-cache",
    },
  },
});

export default authClient;
