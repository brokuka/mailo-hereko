import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}/`,
  }),
  endpoints: (build) => ({
    getResultsByFilter: build.query({
      query: ({ s, limit, page } = "") => ({
        url: "search",
        params: {
          s: s && s,
          limit: limit ? limit : process.env.NEXT_PUBLIC_ITEMS_LIMIT,
          page: page ? page : process.env.NEXT_PUBLIC_START_PAGE,
        },
      }),
    }),
  }),
});

export const { useGetResultsByFilterQuery } = searchApi;
