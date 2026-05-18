import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
import { PATHS } from "./constants/paths";
import BudgetsPage from "./pages/BudgetsPage/BudgetsPage";

export const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: PATHS.transactions,
        element: <TransactionsPage />,
      },
      {
        path: PATHS.budgets,
        element: <BudgetsPage />,
      },
    ],
  },
]);
