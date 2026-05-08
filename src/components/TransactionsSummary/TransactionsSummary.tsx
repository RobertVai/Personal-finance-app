import styles from "./TransactionsSummary.module.css";
import { financeData } from "../../data/financeData";
const TransactionsSummary = () => {
  const recentTransactions = financeData.transactions.slice(0, 5);

  return (
    <div>
      {recentTransactions.map((t) => (
        <div key={t.name}>
          <img src={t.avatar} alt={t.name} />
          <p>{t.name}</p>
          <p>{t.amount}</p>
          <p>{t.date}</p>
        </div>
      ))}
    </div>
  );
};

export default TransactionsSummary;
