import styles from "./BudgetForm.module.css";

const BudgetForm = () => {
  return (
    <form className={styles.form}>
      <p className={styles.description}>
        Choose a category to set a spending budget. These categories can help
        you monitor spending.
      </p>

      <div className={styles.formGroup}>
        <label htmlFor="budget-category">Budget Category</label>

        <select id="budget-category" className={styles.input}>
          <option>Entertainment</option>
          <option>Bills</option>
          <option>Dining Out</option>
          <option>Personal Care</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="maximum-spend">Maximum Spend</label>

        <div className={styles.amountInputWrapper}>
          <span>$</span>

          <input
            id="maximum-spend"
            type="number"
            placeholder="e.g. 2000"
            className={styles.amountInput}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="theme">Theme</label>

        <select id="theme" className={styles.input}>
          <option>Green</option>
          <option>Cyan</option>
          <option>Yellow</option>
          <option>Pink</option>
        </select>
      </div>

      <button type="submit" className={styles.submitButton}>
        Add Budget
      </button>
    </form>
  );
};

export default BudgetForm;
