import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}/`,
  }),
  endpoints: (build) => ({
    getResultsByFilter: build.query({
      query: (string) => ({
        url: "search",
        params: {
          s: string,
          limit: 12,
        },
      }),
    }),
  }),
});

export const { useGetResultsByFilterQuery } = searchApi;
