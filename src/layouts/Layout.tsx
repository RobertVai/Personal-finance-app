import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.pageWrapper}>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
