import { configureStore } from "@reduxjs/toolkit";

import watchedSlice from "./watched/watchedSlice";
// import { watchedApi } from "./watched/watched.api";
import filterSlice from "./filter/filterSlice";
// import { searchApi } from "./search/search.api";
// import { authApi } from "./auth/auth.api";
import authSlice from "./auth/authSlice";
import dashboardSlice from "./dashboard/dashboardSlice";
// import { suggestionsApi } from "./suggestions/suggestions.api";
import { api } from "./api/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [watchedSlice.name]: watchedSlice.reducer,
    // [watchedApi.reducerPath]: watchedApi.reducer,
    [filterSlice.name]: filterSlice.reducer,
    // [searchApi.reducerPath]: searchApi.reducer,
    [authSlice.name]: authSlice.reducer,
    // [authApi.reducerPath]: authApi.reducer,
    [dashboardSlice.name]: dashboardSlice.reducer,
    // [suggestionsApi.reducerPath]: suggestionsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(api.middleware),
  /*       .concat(searchApi.middleware)
      .concat(authApi.middleware)
      .concat(suggestionsApi.middleware)
      .concat(watchedApi.middleware), */
});
