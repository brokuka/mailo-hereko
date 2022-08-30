import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeType(state, action) {
      state.type = action.payload;
    },
  },
});

export const { changeType } = filterSlice.actions;

export default filterSlice;
