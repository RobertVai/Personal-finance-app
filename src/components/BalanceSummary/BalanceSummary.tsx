import styles from "./BalanceSummary.module.css";
import { financeData } from "../../data/financeData";

const BalanceSummary = () => {
  const cards = [
    {
      title: "Current Balance",
      amount: financeData.balance.current,
    },
    {
      title: "Income",
      amount: financeData.balance.income,
    },
    {
      title: "Expenses",
      amount: financeData.balance.expenses,
    },
  ];
  return (
    <div className={styles.cards}>
      {cards.map((c) => (
        <div className={styles.card} key={c.title}>
          <p className={styles.title}>{c.title}</p>
          <p className={styles.amount}>${c.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default BalanceSummary;
