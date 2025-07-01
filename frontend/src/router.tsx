import { createBrowserRouter } from "react-router-dom";

import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "teams", element: <Dashboard /> },
      { path: "inventory", element: <Dashboard /> },
      { path: "customers", element: <Dashboard /> },
      { path: "order-history", element: <Dashboard /> },
      { path: "current-order", element: <Dashboard /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  { path: "*", element: <ErrorPage /> },
]);

export default router;
