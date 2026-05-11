import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Overview from "./pages/Overview/Overview";
import Transactions from "./pages/Transactions/Transactions";
import { PATHS } from "./constants/paths";

export const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: PATHS.transactions,
        element: <Transactions />,
      },
    ],
  },
]);
