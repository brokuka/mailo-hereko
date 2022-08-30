import { createSelector } from "@reduxjs/toolkit";
import { watchedData } from "../watched/watchedSlice";

export const filterType = (state) => state.filter.type;

export const selectFilterdData = createSelector(
  [watchedData, filterType],
  (items, type) => {
    if (type === "all") return items;

    return items.filter((item) => item.media_type === type);
  }
);
