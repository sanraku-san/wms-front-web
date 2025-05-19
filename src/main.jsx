import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Inventory from "./pages/Inventory.jsx";
import Profile from "./pages/Profile.jsx";
import TransactionHistory from "./pages/TransactionHistory.jsx";
import Transactions from "./pages/Transactions.jsx";
import Store from "./pages/Store.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import About from "./pages/About.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/store",
        element: <Store />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/transactionHistory",
        element: <TransactionHistory />,
      },
      {
        path: "/adminPanel",
        element: <AdminPanel />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
