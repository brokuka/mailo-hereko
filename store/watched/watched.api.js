import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const watchedApi = createApi({
  reducerPath: "watchedApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}/`,
  }),
  endpoints: (build) => ({
    getWatched: build.query({
      query: ({ limit } = "") => ({
        url: "watched",
        params: {
          limit: limit ? limit : process.env.NEXT_PUBLIC_ITEMS_LIMIT,
        },
      }),
    }),
  }),
});

export const { useGetWatchedQuery } = watchedApi;
