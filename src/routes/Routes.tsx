import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthWrapper from "../components/auth/AuthWrapper";
import Dashboard from "../pages/Dashboard";
import ProjectWrapper from "../components/project/ProjectWrapper";
import Settings from "../components/common/Settings";
import AddProject from "../pages/AddProject";
import ProtectedRoute from "./ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthWrapper />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />,
    children: [
      {
        path: "",
        element: <ProjectWrapper />,
      },
      {
        path: "add-project",
        element: <AddProject />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
