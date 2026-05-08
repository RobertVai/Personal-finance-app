import styles from "./BudgetsSummary.module.css";
import { financeData } from "../../data/financeData";

const BudgetsSummary = () => {
  return (
    <div>
      {financeData.budgets.map((b) => (
        <div key={b.category}>
          <p>{b.category}</p>
          <p>{b.maximum}</p>
        </div>
      ))}
    </div>
  );
};

export default BudgetsSummary;
