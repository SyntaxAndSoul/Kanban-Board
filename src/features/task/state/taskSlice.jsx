// import { createSlice, nanoid } from "@reduxjs/toolkit";

// const savedTasks = localStorage.getItem("tasks");
// const taskSlice = createSlice({
//   name: "tasks",
//   initialState: {
//     tasks: savedTasks ? JSON.parse(savedTasks) : [],
//   },
//   reducers: {
//     addtask: {
//       reducer(state, action) {
//         state.tasks.push(action.payload);
//       },
//       prepare(task) {
//         return {
//           payload: {
//             ...task,
//             id: nanoid(),
//             status: task.status || "Todo",
//             priority: task.priority || "Medium",
//           },
//         };
//       },
//     },
//     edittask: (state, action) => {
//       const { id, title, description, status, priority } = action.payload;
//       const existingTask = state.tasks.find((task) => task.id === id);
//       if (existingTask) {
//         existingTask.title = title;
//         existingTask.description = description;
//         existingTask.status = status;
//         existingTask.priority = priority;
//       }
//     },
//     deletetask: (state, action) => {
//       const { id } = action.payload;
//       state.tasks = state.tasks.filter((task) => task.id !== id);
//     },
//     movetask: (state, action) => {
//       const { id, newStatus } = action.payload;
//       const existingTask = state.tasks.find((task) => task.id === id);
//       if (existingTask) {
//         existingTask.status = newStatus;
//       }
//     },
//   },
// });
// export const { addtask, edittask, deletetask, movetask } = taskSlice.actions;
// export default taskSlice.reducer;


import { createSlice, nanoid } from "@reduxjs/toolkit";

const savedTasks = localStorage.getItem("tasks");

const taskSlice = createSlice({
  name: "task",

  initialState: {
    tasks: Array.isArray(savedTasks)
      ? savedTasks
      : Array.isArray(savedTasks?.tasks)
        ? savedProjects.projects
        : [],
  },

  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },

      prepare({ projectId, title, description }) {
        return {
          payload: {
            id: nanoid(),
            projectId,
            title,
            description,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },

    editTask(state, action) {
      const { id, title, description } = action.payload;

      const task = state.tasks.find((item) => item.id === id);

      if (task) {
        task.title = title;
        task.description = description;
      }
    },

    toggleTask(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload.id);

      if (task) {
        task.completed = !task.completed;
      }
    },

    deleteTask(state, action) {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload.id);
    },

    deleteTasksByProject(state, action) {
      state.tasks = state.tasks.filter(
        (item) => item.projectId !== action.payload.projectId,
      );
    },
  },
});

export const {
  addTask,
  editTask,
  toggleTask,
  deleteTask,
  deleteTasksByProject,
} = taskSlice.actions;

export default taskSlice.reducer;
