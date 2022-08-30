import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  value: "",
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
  },
});

export const { setFilterType, setFilterValue } = filterSlice.actions;

export default filterSlice;
