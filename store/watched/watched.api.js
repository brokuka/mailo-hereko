import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@store/auth/auth.api";

export const watchedApi = createApi({
  reducerPath: "watchedApi",
  baseQuery,
  endpoints: (build) => ({
    getWatched: build.query({
      query: ({ s, limit, media_type, page } = "") => ({
        url: "watched",
        params: {
          s: s,
          limit: limit ? limit : process.env.NEXT_PUBLIC_ITEMS_LIMIT,
          page: page,
          media_type: media_type,
        },
      }),
    }),
  }),
});

export const { useGetWatchedQuery } = watchedApi;
