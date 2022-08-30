import { configureStore } from "@reduxjs/toolkit";

import watchedSlice from "./watched/watchedSlice";
import filterSlice from "./filter/filterSlice";

export const store = configureStore({
  reducer: {
    [watchedSlice.name]: watchedSlice.reducer,
    [filterSlice.name]: filterSlice.reducer,
  },
});
