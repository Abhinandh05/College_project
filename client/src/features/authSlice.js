import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  user: null,
  isAuthenticated: false,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the user and update authentication status
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    // Action to log the user in (alternative naming)
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    // Action to log the user out and reset authentication status
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    // Action to log out the user (alternative naming)
    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Export actions and reducer
export const { setUser, userLoggedIn, logoutUser, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
