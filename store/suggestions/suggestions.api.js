import { api } from "@store/api/api";

export const suggestionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPageResults: build.query({
      query: ({ limit, page } = "") => ({
        url: "suggest",
        params: {
          limit: limit ? limit : process.env.NEXT_PUBLIC_ITEMS_LIMIT,
          page: page ? page : process.env.NEXT_PUBLIC_START_PAGE,
        },
      }),
      providesTags: ["Suggestions"],
    }),
    postManual: build.mutation({
      query: ({ title, link }) => ({
        url: "suggest/manual",
        method: "POST",
        body: { title, link },
      }),
    }),
  }),
});

export const { useGetPageResultsQuery, usePostManualMutation } = suggestionsApi;
