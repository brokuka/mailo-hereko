import { createSelector } from "@reduxjs/toolkit";
import { watchedData } from "../watched/watchedSlice";

export const filterType = (state) => state.filter.type;
export const filterValue = (state) => state.filter.value;
export const filterTypeLabels = (state) => state.filter.labels;

export const selectFilteredTypeLabels = createSelector(
  [filterTypeLabels],
  (labels) => {
    return labels.filter(
      (label, index, array) => index === array.indexOf(label)
    );
  }
);

export const selectFilterdData = createSelector(
  [watchedData, filterType, filterValue],
  (items, type, value) => {
    const getData = (withoutMedia, onlyCategory) => {
      if (withoutMedia)
        return items.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        );

      if (onlyCategory) return items.filter((item) => item.media_type === type);

      return items.filter(
        (item) =>
          item.media_type === type &&
          item.title.toLowerCase().includes(value.toLowerCase())
      );
    };

    if (type && type !== "all")
      return value ? getData() : getData(undefined, true);
    if (type && type !== "all")
      return value ? getData() : getData(undefined, true);

    return value ? getData(true) : items;
  }
);
