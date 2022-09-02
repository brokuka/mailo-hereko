import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  data: [],
};

const watchedSlice = createSlice({
  name: "watched",
  initialState,
  reducers: {
    addData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { addData } = watchedSlice.actions;

export const watchedData = (state) => state.watched.data;

export default watchedSlice;
