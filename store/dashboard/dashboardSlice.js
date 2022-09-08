import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: null,
  tv_shows: null,
  suggested: null,
  manual_suggested: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addDashboardData(state, action) {
      const { movies, tv_shows, suggested, manual_suggested } = action.payload;

      state.movies = movies;
      state.tv_shows = tv_shows;
      state.suggested = suggested;
      state.manual_suggested = manual_suggested;
    },
  },
});

export const { addDashboardData } = dashboardSlice.actions;

export const selectCurrentDashboard = (state) => state.dashboard;

export default dashboardSlice;
