import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  data: [],
  filteredData: [],
};

const watchedSlice = createSlice({
  name: "watched",
  initialState,
  reducers: {
    addData(state, action) {
      state.data = [...action.payload];
    },
    filterData(state, action) {
      state.filteredData = state.data.filter(
        (item) => item.media_type === action.payload
      );
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        data: [...action.payload.watched.data],
      };
    },
  },
});

export const { addData, filterData } = watchedSlice.actions;

export const watchedData = (state) => state.watched.data;
export const filteredData = (state) => state.watched.filteredData;

export default watchedSlice;
