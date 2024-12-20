import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    // eslint-disable-next-line no-unused-vars
    userLoggedOut: (state, action) => {
      state.token = undefined;
      state.user = undefined;
    },
  },
});

export const { userLogin, userLoggedOut, userInfoSet } = authSlice.actions;
export default authSlice.reducer;
