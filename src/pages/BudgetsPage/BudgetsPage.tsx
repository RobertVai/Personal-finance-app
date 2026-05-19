import styles from "./BudgetsPage.module.css";
import { financeData } from "../../data/financeData";
import { formatAmount } from "../../utils/formatAmount";
import { formatDate } from "../../utils/formatDate";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import BudgetForm from "../../components/BudgetForm/BudgetForm";
import ActionsMenu from "../../components/ActionsMenu/ActionsMenu";

const BudgetsPage = () => {
  const [budgets, setBudgets] = useState(financeData.budgets);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const budgetsWithTransactions = budgets.map((budget) => {
    const recentSpendings = financeData.transactions
      .filter((transaction) => transaction.category === budget.category)
      .slice(0, 3);
    const augustTotal = recentSpendings
      .filter((transaction) => {
        const date = new Date(transaction.date);

        return date.getMonth() === 7;
      })
      .reduce((acc, transaction) => {
        return acc + Math.abs(transaction.amount);
      }, 0);

    return {
      ...budget,
      transactions: recentSpendings,
      augustTotal,
    };
  });

  const deleteBudget = (id: number) => {
    setBudgets((prev) => prev.filter((budget) => budget.id !== id));
  };

  return (
    <div className={styles["budgets"]}>
      <div className={styles["left-column"]}>
        <h2>Spending Summary</h2>
        {budgetsWithTransactions.map((budget) => (
          <div key={budget.id}>
            <p>${budget.category}</p>
            <p>
              ${budget.augustTotal} of ${budget.maximum}
            </p>
          </div>
        ))}
      </div>
      <div className={styles["right-column"]}>
        <div>
          <button onClick={() => setIsBudgetModalOpen(true)}>Add budget</button>
        </div>
        {budgetsWithTransactions.map((budget) => (
          <div key={budget.category}>
            <h2>{budget.category}</h2>
            <button
              onClick={() =>
                setOpenMenuId(
                  openMenuId === budget.category ? null : budget.category,
                )
              }
            >
              ...
            </button>
            {openMenuId === budget.category && (
              <ActionsMenu
                editLabel="Edit Budget"
                deleteLabel="Delete Budget"
                onEdit={() => console.log("edit")}
                onDelete={() => console.log("delete")}
              />
            )}
            <p>Maximum of {budget.maximum}</p>
            <div>
              <div>Spent ${budget.augustTotal}</div>
              <div>Remaining ${budget.maximum - budget.augustTotal}</div>
            </div>

            {budget.transactions.map((transaction) => (
              <div key={transaction.id}>
                <img src={transaction.avatar} alt={transaction.name} />
                <p>{transaction.name}</p>
                <p>{formatAmount(transaction.amount)}</p>
                <p>{formatDate(transaction.date)}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Modal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        title="Add New Budget"
      >
        <BudgetForm />
      </Modal>
    </div>
  );
};

export default BudgetsPage;
