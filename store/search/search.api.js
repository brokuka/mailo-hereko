import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@store/auth/auth.api";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery,
  tagTypes: ["Filter"],
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
      providesTags: ["Filter"],
    }),
    postSuggest: build.mutation({
      query: ({ id, media_type } = "") => ({
        url: "suggest",
        method: "post",
        body: { id, media_type },
      }),
      invalidatesTags: ["Filter"],
    }),
    postWatched: build.mutation({
      query: ({ id, media_type } = "") => ({
        url: "watched",
        method: "post",
        body: { id, media_type },
      }),
      invalidatesTags: ["Filter"],
    }),
  }),
});

export const {
  useGetResultsByFilterQuery,
  usePostSuggestMutation,
  //   usePostWatchedMutation,
} = searchApi;
