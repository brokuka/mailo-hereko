import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || localStorage.getItem("loginToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "post",
        body: { ...credentials },
      }),
    }),
    dashboard: build.query({
      query: () => ({
        url: "/auth/me",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useDashboardQuery } = authApi;
