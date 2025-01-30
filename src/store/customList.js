/* eslint-disable */
import { defineStore } from "pinia";
import gql from "graphql-tag";
import apolloClient from "@/src/apollo.js";

export const useCustomListStore = defineStore({
  id: "listStore",
  state: () => ({
    data: {},
    states: {
      nextListFetching: false,
    },
    size: 0,
  }),
  getters: {
    getDataByQuery: function () {
      return function (key) {
        return this.data[key];
      };
    },
  },
  actions: {
    resetStore() {
      this.data = {};
      this.size = 0;
    },
    async refreshList({ name, filters = null }) {
      for (let key in this.data) {
        if (key.toLowerCase().includes(name.toLowerCase()) || key === name) {
          this.data[key].refresh = true;
          const dataset = this.data[key];

          if (dataset.infinite) {
            const promises = [];
            for (let page = 1; page <= dataset.current_page; page++) {
              const newMeta = {
                page,
                returnFetchedData: true,
                ...(filters && { filters }),
              };
              promises.push(
                this.fetchCustomListData(Object.assign(dataset.query, newMeta)),
              );
            }

            const results = await Promise.all(promises);
            const mergedData = results.reduce(
              (acc, result) => {
                acc.data = [...acc.data, ...result.data];
                acc.total = result.total; // Total zostaje nadpisany
                acc.current_page = Math.max(
                  acc.current_page,
                  result.current_page,
                );
                return acc;
              },
              { data: [], total: 0, current_page: 0 },
            );
            if (this.data[dataset?.query?.storeName]) {
              this.data[dataset.query.storeName].total = mergedData.total;
              this.data[dataset.query.storeName].data = mergedData.data;
            }
          } else {
            const newMeta = {
              page: dataset.current_page,
              ...(filters && { filters, page: 1 }),
            };
            const result = await this.fetchCustomListData(
              Object.assign(dataset.query, newMeta),
            );
          }
        }
      }
    },
    refreshCaregiversLists() {
      this.refreshList({ name: "caregiver" });
    },
    refreshJobsLists() {
      this.refreshList({ name: "job" });
    },
    refreshCustomersLists() {
      this.refreshList({ name: "customer" });
    },
    refreshApplicationsLists() {
      this.refreshList({ name: "application" });
    },
    async refreshAllLists() {
      await Promise.all([
        this.refreshCaregiversLists(),
        this.refreshJobsLists(),
        this.refreshCustomersLists(),
        this.refreshApplicationsLists(),
      ]);
    },
    clearLists({ byNameLike = false }) {
      if (byNameLike) {
        for (const key in this.data) {
          if (this.data.hasOwnProperty(key) && key.includes(byNameLike)) {
            delete this.data[key];
          }
        }
      }
    },
    getPrevElement({ listStoreName, id }) {
      const list = this.data[listStoreName]?.data;
      if (!list) return;
      const currentItemIndex = list.findIndex(item => item.id === parseInt(id));
      return list[currentItemIndex - 1];
    },
    getNextElement({ listStoreName, route }) {
      const list = this.data[listStoreName]?.data;
      if (!list) return;
      const currentItemIndex = list.findIndex(
        item => item.id === parseInt(route.params.id),
      );
      const lastElement = list[currentItemIndex + 1];
      if (!list[currentItemIndex + 5] && !this.states.nextListFetching) {
        this.fetchCustomListData(route.meta.fetchCustomListData);
      }
      return lastElement;
    },
    async fetchCustomListData({
      query,
      queryDynamicParams = null,
      fields = "",
      storeName = null,
      filters = null,
      limit = 10,
      sort = null,
      search = null,
      page = null,
      type = null,
      infinite = true,
      returnFetchedData = false,
      filtersQuery = null,
      pagination = true,
      direction = null,
      stripPaginationFields = false,
    }) {
      let resultToReturn = null;
      storeName = storeName ? storeName : query;
      if (filters && Object.keys(filters).length === 0) {
        filters = null;
      }
      const pageNumber = page
        ? page
        : getPage({
            data: this.data[storeName],
            sort,
            search,
            filters,
            returnFetchedData,
          });
      if (
        this.data[storeName] &&
        !this.data[storeName].has_more_pages &&
        this.data[storeName].search === search &&
        pageNumber !== 1 &&
        infinite &&
        !returnFetchedData
      ) {
        return;
      }

      // if (pageNumber && pageNumber > 1 && this.data[storeName]) {
      //   sort = this.data[storeName].sort;
      //   search = this.data[storeName].search;
      //   filters = this.data[storeName].filters;
      // }

      const QUERY_GQL = gql`
        query ${query}(${pagination ? "$page: Int!, $limit: Int!" : ""} ${
          queryDynamicParams
            ? ", " + queryDynamicParams.variableDefinitions
            : ""
        } 
        ${filters && filtersQuery ? `$filters: ${filtersQuery}` : ""}
        ${sort ? "$order_by: String!" : ""} ${
          direction ? "$order_direction: String!" : ""
        } ${search ? "$search: String!" : ""} ${type ? "$type: String!" : ""}) {
          ${query}(${pagination ? "page: $page, limit: $limit" : ""}${
            queryDynamicParams
              ? ", " + queryDynamicParams.operationArguments
              : ""
          } 
          ${filters && filtersQuery ? "filters: $filters" : ""}
          ${sort ? "order_by: $order_by" : ""} ${
            direction ? "order_direction: $order_direction" : ""
          } ${search ? "search: $search" : ""} ${type ? "type: $type" : ""}) {
            ${
              pagination
                ? `${
                    !stripPaginationFields
                      ? `
                  total
                  per_page
                  current_page
                  from
                  to
                  last_page
                  has_more_pages
                `
                      : ""
                  }
            data {
              ${fields}
            }
            `
                : `id ${fields}`
            }

          }
        }
      `;

      this.states.nextListFetching = true;
      await apolloClient
        .query({
          query: QUERY_GQL,
          variables: Object.assign(
            {
              page: pageNumber,
              limit: limit,
              order_by: sort,
              order_direction: direction,
              type,
              search,
              filters,
            },
            queryDynamicParams ? queryDynamicParams.variables : {},
          ),
        })
        .then(result => {
          for (let i in result.data[query].data) {
            delete result.data[query].data[i].__typename;
          }

          result.data[query].injected_at = new Date();
          result.data[query].query = arguments[0];
          result.data[query].infinite = infinite;

          if (returnFetchedData) {
            resultToReturn = result.data[query];
            return;
          }
          if (pageNumber === 1) {
            this.data[storeName] = null;
          }

          if (
            pagination &&
            (!this.data[storeName] ||
              result.data[query].current_page === 1 ||
              !infinite)
          ) {
            this.data[storeName] = Object.assign(result.data[query], {
              sort: sort,
              direction,
              search,
              filters,
              refresh: false,
            });
          } else if (pagination) {
            this.data[storeName] = {
              sort: sort,
              direction,
              search,
              filters,
              ...this.data[storeName],
              ...result.data[query],
              data: [...this.data[storeName].data, ...result.data[query].data],
              refresh: false,
            };
          } else if (!pagination) {
            let bridge = {};
            bridge.data = JSON.parse(JSON.stringify(result.data[query]));
            bridge.injected_at = new Date();
            bridge.query = arguments[0];
            bridge.infite = infinite;
            bridge.data = result.data[query];

            this.data[storeName] = {
              sort: sort,
              direction,
              search,
              filters,
              ...this.data[storeName],
              ...bridge,
              refresh: false,
            };
          }
          this.size = new Blob([JSON.stringify(this.data)]).size;
          this.states.nextListFetching = false;
        });

      return resultToReturn;
    },
  },
});

function getPage({ data, sort, search, filters, returnFetchedData }) {
  if (returnFetchedData) {
    return 1;
  }
  if (data && data.has_more_pages) {
    return data.current_page + 1;
  }

  return 1;
  // switch (true) {
  //   case data && data.sort === sort && data.search === search:
  //     return data.current_page + 1;
  //   case data &&
  //     (data.sort !== sort ||
  //       data.search !== search ||
  //       data.filters !== filters):
  //     return 1;
  //   default:
  //     return 1;
  // }
}
