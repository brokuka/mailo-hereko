import { api } from "@store/api/api";

export const authApi = api.injectEndpoints({
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
