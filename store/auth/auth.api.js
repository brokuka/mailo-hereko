import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("loginToken");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "post",
        body: { ...credentials },
      }),
    }),
    logOut: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "delete",
      }),
    }),
    dashboard: build.query({
      query: () => ({
        url: "/auth/me",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useDashboardQuery,
  useLazyDashboardQuery,
  useLogOutMutation,
} = authApi;
