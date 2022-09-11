import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@store/auth/auth.api";

export const suggestionsApi = createApi({
  reducerPath: "suggestionsApi",
  baseQuery,
  endpoints: (build) => ({
    getPageResults: build.query({
      query: ({ limit, page } = "") => ({
        url: "suggest",
        params: {
          limit: limit ? limit : process.env.NEXT_PUBLIC_ITEMS_LIMIT,
          page: page ? page : process.env.NEXT_PUBLIC_START_PAGE,
        },
      }),
    }),
  }),
});

export const { useGetPageResultsQuery } = suggestionsApi;
