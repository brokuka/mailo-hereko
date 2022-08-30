import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import watchedSlice from "./watched/watchedSlice";
import filterSlice from "./filter/filterSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [watchedSlice.name]: watchedSlice.reducer,
      [filterSlice.name]: filterSlice.reducer,
    },
  });
};

export const wrapper = createWrapper(makeStore, { debug: true });
