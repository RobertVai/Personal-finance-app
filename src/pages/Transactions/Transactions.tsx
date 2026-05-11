import { useState } from "react";
import { financeData } from "../../data/financeData";
import { useFilterTranscations } from "../../hooks/useFilterTransactions";
import clsx from "clsx";
import styles from "./Transactions.module.css";

const Transactions = () => {
  const {
    searchValue,
    sortBy,
    category,
    currentPage,
    totalPages,
    pages,
    categories,
    transformedTransactions,
    setCurrentPage,
    handleSearchChange,
    handleSortChange,
    handleCategoryChange,
  } = useFilterTranscations();

  return (
    <section className={styles.transactions}>
      <h1 className={styles.title}>Transactions</h1>

      <div className={styles.card}>
        <div className={styles.controls}>
          <input
            className={styles.search}
            type="text"
            placeholder="Search transaction"
            value={searchValue}
            onChange={(event) => handleSearchChange(event.target.value)}
          />

          <div className={styles.filters}>
            <label className={styles.filter}>
              Sort by
              <select
                value={sortBy}
                onChange={(event) => handleSortChange(event.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest</option>
                <option value="lowest">Lowest</option>
              </select>
            </label>

            <label className={styles.filter}>
              Category
              <select
                value={category}
                onChange={(event) => handleCategoryChange(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Recipient / Sender</th>
              <th>Category</th>
              <th>Transaction Date</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {transformedTransactions.map((transaction) => (
              <tr key={`${transaction.name}-${transaction.date}`}>
                <td>
                  <div className={styles.recipient}>
                    <img src={transaction.avatar} alt="" />
                    <span>{transaction.name}</span>
                  </div>
                </td>

                <td>{transaction.category}</td>
                <td>{transaction.formattedDate}</td>
                <td className={transaction.amountClass}>
                  {transaction.formattedAmount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            Prev
          </button>

          <div className={styles.pages}>
            {pages.map((page) => (
              <button
                key={page}
                className={clsx(currentPage === page && styles["active-page"])}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Transactions;
