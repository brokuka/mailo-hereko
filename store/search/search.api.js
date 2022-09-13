import { api } from "@store/api/api";

export const searchApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSuggests: build.query({
      query: ({ s, limit, page } = "") => ({
        url: "search",
        params: {
          s: s && s,
          limit: limit ? limit : process.env.NEXT_PUBLIC_ITEMS_LIMIT,
          page: page ? page : process.env.NEXT_PUBLIC_START_PAGE,
        },
      }),
      providesTags: ["Search"],
    }),
    postSuggest: build.mutation({
      query: ({ id, media_type, url } = "") => ({
        url: url ? url : "suggest",
        method: "POST",
        body: { id, media_type },
      }),
      invalidatesTags: ["Search"],
    }),
  }),
});

export const { useGetSuggestsQuery, usePostSuggestMutation } = searchApi;
