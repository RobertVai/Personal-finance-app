import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Overview from "./pages/Overview/Overview";
import Transactions from "./pages/Transactions/Transactions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
    ],
  },
]);
