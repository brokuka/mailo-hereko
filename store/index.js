import { configureStore } from "@reduxjs/toolkit";

import watchedSlice from "./watched/watchedSlice";
import filterSlice from "./filter/filterSlice";
import { searchApi } from "./search/search.api";

export const store = configureStore({
  reducer: {
    [watchedSlice.name]: watchedSlice.reducer,
    [filterSlice.name]: filterSlice.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(searchApi.middleware),
});
