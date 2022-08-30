import { createSelector } from "@reduxjs/toolkit";
import { watchedData } from "../watched/watchedSlice";

export const filterType = (state) => state.filter.type;
export const filterValue = (state) => state.filter.value;

export const selectFilterdData = createSelector(
  [watchedData, filterType, filterValue],
  (items, type, value) => {
    if (type === "all") {
      return value
        ? items.filter((item) => item.title.toLowerCase().includes(value))
        : items;
    } else {
      return value
        ? items.filter(
            (item) =>
              item.media_type === type &&
              item.title.toLowerCase().includes(value)
          )
        : items.filter((item) => item.media_type === type);
    }
  }
);
