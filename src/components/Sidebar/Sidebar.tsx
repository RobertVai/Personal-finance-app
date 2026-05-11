import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import financeLogo from "../../../public/assets/images/logo-large.svg";
import overviewLogo from "../../../public/assets/images/icon-nav-overview.svg";
import transactionsLogo from "../../../public/assets/images/icon-nav-transactions.svg";
import budgetsLogo from "../../../public/assets/images/icon-nav-budgets.svg";
import potsLogo from "../../../public/assets/images/icon-nav-pots.svg";
import billsLogo from "../../../public/assets/images/icon-nav-recurring-bills.svg";
import minimizeLogo from "../../../public/assets/images/icon-minimize-menu.svg";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.navigation}>
        <div className={styles.logo}>
          <img src={financeLogo} alt="Finance" />
        </div>

        <nav>
          <ul className={styles["nav-list"]}>
            <li className={styles["nav-item"]}>
              <img src={overviewLogo} alt="Overview" />
              <span>Overview</span>
            </li>
            <li className={styles["nav-item"]}>
              <img src={transactionsLogo} alt="Transactions" />
              <span>
                <Link to="/transactions">Transactions</Link>
              </span>
            </li>
            <li className={styles["nav-item"]}>
              <img src={budgetsLogo} alt="Budgets" />
              <span>Budgets</span>
            </li>
            <li className={styles["nav-item"]}>
              <img src={potsLogo} alt="Pots" />
              <span>Pots</span>
            </li>
            <li className={styles["nav-item"]}>
              <img src={billsLogo} alt="Reccuring Bills" />
              <span>Reccuring Bills</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles["sidebar-footer"]}>
        <button>
          <img src={minimizeLogo} alt="Minimize Menu" />
          <span>Minimize Menu</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
