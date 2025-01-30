import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { performRequest } from "@/src/features/shared/utils/performFetchRequest.js";

const removeTypename = data => {
  if (Array.isArray(data)) {
    return data.map(removeTypename);
  } else if (typeof data === "object" && data !== null) {
    const { __typename, ...rest } = data;
    return Object.keys(rest).reduce((acc, key) => {
      acc[key] = removeTypename(rest[key]);
      return acc;
    }, {});
  }
  return data;
};
const abortController = new AbortController();

const apiUrl = import.meta.env.VITE_API_URL;

const customFetch = async (uri, options) => {
  options.signal = abortController.signal;

  return performRequest({
    uri,
    options,
    retry: true,
  });
};

const httpLink = createUploadLink({
  uri: `${apiUrl}/graphql`,
  fetch: customFetch,
  credentials: "include",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "application/json",
  },
});

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  return {
    credentials: "include",
    headers: {
      ...headers,
      "Accept": "application/json",
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink), // Łączenie authLink z httpLink (teraz uploadLink)
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
  request: operation => {
    const variables = operation.variables;
    if (variables) {
      operation.variables = removeTypename(variables);
    }
  },
});

export default apolloClient;
