import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  token: "",
  authorized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setUser(state, action) {
      localStorage.setItem("loginToken", action.payload);
    },
    setAuthStatus(state, action) {
      state.authorized = action.payload;
    },
    removeStateData(state, action) {
      state.email = null;
      state.password = null;
      state.token = null;
      localStorage.removeItem("loginToken");
    },
  },
});

export const {
  setEmail,
  setPassword,
  setToken,
  setUser,
  setAuthStatus,
  removeStateData,
} = authSlice.actions;

export default authSlice;

export const selectCurrentEmail = (state) => state.auth.email;
export const selectCurrentPassword = (state) => state.auth.password;
export const selectCurrentAuthStatus = (state) => state.auth.authorized;
