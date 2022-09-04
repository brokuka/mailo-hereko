import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "all",
  value: "",
  labels: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterType(state, action) {
      state.type = action.payload;
    },
    setFilterValue(state, action) {
      state.value = action.payload;
    },
    setFilterTypeLabels(state, action) {
      state.labels = [...state.labels, ...action.payload];
    },
  },
});

export const { setFilterType, setFilterValue, setFilterTypeLabels } =
  filterSlice.actions;

export default filterSlice;
