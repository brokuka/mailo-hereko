import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import watchedSlice from "./watched/watchedSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [watchedSlice.name]: watchedSlice.reducer,
    },
  });
};

export const wrapper = createWrapper(makeStore, { debug: true });
