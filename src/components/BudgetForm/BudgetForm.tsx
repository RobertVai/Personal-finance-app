import { useEffect, useState } from "react";
import styles from "./BudgetForm.module.css";
import type { Budget } from "../../types/budget";

type BudgetFormProps = {
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
  setIsBudgetModalOpen: (value: boolean) => void;
  editingBudget: Budget | null;
  setEditingBudget: (value: Budget | null) => void;
};

const BudgetForm = ({
  setBudgets,
  setIsBudgetModalOpen,
  editingBudget,
  setEditingBudget,
}: BudgetFormProps) => {
  const [category, setCategory] = useState("");
  const [maximum, setMaximum] = useState("");
  const [theme, setTheme] = useState("");

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBudget) {
      setBudgets((prev) =>
        prev.map((budget) =>
          budget.id === editingBudget.id
            ? {
                ...budget,
                category,
                maximum: Number(maximum),
                theme,
              }
            : budget,
        ),
      );
      setEditingBudget(null);
      setIsBudgetModalOpen(false);

      return;
    }

    if (!category.trim() || !maximum.trim() || !theme.trim()) {
      return;
    }

    const newBudget = {
      id: Date.now(),
      category,
      maximum: Number(maximum),
      theme,
    };

    setBudgets((prev) => [...prev, newBudget]);
    setCategory("");
    setMaximum("");
    setTheme("");
    setIsBudgetModalOpen(false);
  };

  useEffect(() => {
    if (editingBudget) {
      setCategory(editingBudget.category);
      setMaximum(editingBudget.maximum.toString());
      setTheme(editingBudget.theme);
    }
  }, [editingBudget]);

  return (
    <form className={styles.form} onSubmit={handleAddBudget}>
      <p className={styles.description}>
        Choose a category to set a spending budget. These categories can help
        you monitor spending.
      </p>

      <div className={styles["form-group"]}>
        <label htmlFor="budget-category">Budget Category</label>

        <select
          id="budget-category"
          className={styles.input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {editingBudget && (
            <option value={editingBudget.category}>
              {editingBudget.category}
            </option>
          )}

          <option value="Investments">Investments</option>
          <option value="Gifts">Gifts</option>
          <option value="Hobbies">Hobbies</option>
          <option value="Fitness">Fitness</option>
          <option value="Subscriptions">Subscriptions</option>
        </select>
      </div>

      <div className={styles["form-group"]}>
        <label htmlFor="maximum-spend">Maximum Spend</label>

        <div className={styles["amount-input-wrapper"]}>
          <span>$</span>
          <input
            id="maximum-spend"
            type="number"
            placeholder="e.g. 2000"
            className={styles["amount-input"]}
            value={maximum}
            onChange={(e) => setMaximum(e.target.value)}
          />
        </div>
      </div>

      <div className={styles["form-group"]}>
        <label htmlFor="theme">Theme</label>

        <select
          id="theme"
          className={styles.input}
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="">Select theme</option>
          <option value="#277C78">Green</option>
          <option value="#82C9D7">Cyan</option>
          <option value="#F2CDAC">Yellow</option>
          <option value="#626070">Navy</option>
        </select>
      </div>

      <button type="submit" className={styles["submit-button"]}>
        {editingBudget ? "Save Changes" : "Add Budget"}
      </button>
    </form>
  );
};

export default BudgetForm;
