import { createSlice, nanoid } from "@reduxjs/toolkit";

const savedProjects = localStorage.getItem("projects");

const projectSlice = createSlice({
  name: "project",

  initialState: {
    projects: Array.isArray(savedProjects)
      ? savedProjects
      : Array.isArray(savedProjects?.projects)
        ? savedProjects.projects
        : [],
  },

  reducers: {
    addProject: {
      reducer(state, action) {
        state.projects.push(action.payload);
      },

      prepare({ name, description }) {
        return {
          payload: {
            id: nanoid(),
            name,
            description,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },

    editProject(state, action) {
      const { id, name, description } = action.payload;

      const project = state.projects.find((item) => item.id === id);

      if (project) {
        project.name = name;
        project.description = description;
      }
    },

    deleteProject(state, action) {
      state.projects = state.projects.filter(
        (item) => item.id !== action.payload.id,
      );
    },
  },
});

export const { addProject, editProject, deleteProject } = projectSlice.actions;

export default projectSlice.reducer;
