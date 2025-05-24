import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Inventory from "./pages/Inventory.jsx";
import Settings from "./pages/Settings.jsx";
import TransactionHistory from "./pages/TransactionHistory.jsx";
import ProductOrders from "./pages/ProductOrders.jsx";
import Store from "./pages/Store.jsx";
<<<<<<< Updated upstream
import Accounts from "./pages/Accounts.jsx";
=======
import Reports from "./pages/Reports.jsx";
import CreateOrder from "./pages/CreateOrder.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
>>>>>>> Stashed changes
import About from "./pages/About.jsx";
import InventoryReport from "./pages/InventoryReport.jsx";
import DeliveryReport from "./pages/DeliveryReport.jsx";
import InboundReport from "./pages/InboundReport.jsx";

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
        path: "/productOrders",
        element: <ProductOrders />,
      },
      {
        path: "/transactionHistory",
        element: <TransactionHistory />,
      },
      {
        path: "/accounts",
        element: <Accounts />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/reports/inventory",
        element: <InventoryReport />,
      },
      {
        path: "/reports/delivery",
        element: <DeliveryReport />,
      },
      {
        path: "/reports/inbound",
        element: <InboundReport />,
      },
      {
        path: "/createOrder",
        element: <CreateOrder />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
