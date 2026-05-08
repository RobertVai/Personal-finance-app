import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Overview from "./pages/Overview/Overview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
    ],
  },
]);
