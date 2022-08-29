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
      state.data = [...action.payload];
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

export const { addData } = watchedSlice.actions;

export const watchedData = (state) => state.watched.data;

export default watchedSlice;
