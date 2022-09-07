import { configureStore } from "@reduxjs/toolkit";

import watchedSlice from "./watched/watchedSlice";
import filterSlice from "./filter/filterSlice";
import { searchApi } from "./search/search.api";
import { authApi } from "./auth/auth.api";
import authSlice from "./auth/authSlice";
import dashboardSlice from "./dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    [watchedSlice.name]: watchedSlice.reducer,
    [filterSlice.name]: filterSlice.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [dashboardSlice.name]: dashboardSlice.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware()
      .concat(searchApi.middleware)
      .concat(authApi.middleware),
});
