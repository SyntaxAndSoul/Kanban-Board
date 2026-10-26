import React from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

import LoginPage from "../features/auth/UI/pages/LoginPage";
import RegisterPage from "../features/auth/UI/pages/RegisterPage";
import ProjectPage from "../features/project/UI/pages/ProjectPage";
import TaskPage from "../features/task/UI/pages/TaskPage";
import { createBrowserRouter, RouterProvider } from "react-router";
import NotFound from "../shared/components/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      { path: "/projects", element: <ProjectPage /> },
      { path: "/projects/:taskId", element: <TaskPage /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
