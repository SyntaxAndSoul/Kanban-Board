import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../../features/auth/state/authSlice"
import projectSlice from "../../features/project/state/projectSlice"
import taskSlice from "../../features/task/state/taskSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    project: projectSlice,
    task : taskSlice
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("auth",JSON.stringify(state.auth))
  localStorage.setItem("projects",JSON.stringify(state.project))
  localStorage.setItem("tasks",JSON.stringify(state.task))

})
