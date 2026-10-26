import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("loggedInUser");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser ? JSON.parse(savedUser) : null,
    isAuthenticated: savedUser ? true : false,
    isLoading: savedUser ? false : true,
  },
  reducers: {
    addUser: (state, action) => {
      ((state.user = action.payload),
        (state.isAuthenticated = true),
        (state.isLoading = false));
    },
    removeUser: (state) => {
      ((state.user = null),
        localStorage.removeItem("loggedInUser"),
        (state.isAuthenticated = false),
        (state.isLoading = false));
    },
  },
});
export const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
