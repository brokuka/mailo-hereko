import { api } from "@store/api/api";

export const watchedApi = api.injectEndpoints({
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
    postWatched: build.mutation({
      query: ({ id, media_type } = "") => ({
        url: "watched",
        method: "POST",
        body: { id, media_type },
      }),
      invalidatesTags: ["Search", "Suggestions"],
    }),
  }),
});

export const { useGetWatchedQuery, usePostWatchedMutation } = watchedApi;
