import { createBrowserRouter } from "react-router-dom";

import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import Teams from "./pages/Teams";
import Customer from "./pages/Customer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "teams", element: <Teams /> },
      { path: "inventory", element: <Dashboard /> },
      { path: "customers", element: <Customer /> },
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
