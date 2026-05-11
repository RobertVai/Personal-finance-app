import { useState } from "react";
import { financeData } from "../../data/financeData";
import styles from "./Transactions.module.css";

const ITEMS_PER_PAGE = 10;

const Transactions = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [category, setCategory] = useState("All Transactions");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "All Transactions",
    ...new Set(financeData.transactions.map((item) => item.category)),
  ];

  let filteredTransactions = [...financeData.transactions];

  if (searchValue) {
    filteredTransactions = filteredTransactions.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }

  if (category !== "All Transactions") {
    filteredTransactions = filteredTransactions.filter(
      (item) => item.category === category,
    );
  }

  if (sortBy === "latest") {
    filteredTransactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }

  if (sortBy === "oldest") {
    filteredTransactions.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }

  if (sortBy === "highest") {
    filteredTransactions.sort((a, b) => b.amount - a.amount);
  }

  if (sortBy === "lowest") {
    filteredTransactions.sort((a, b) => a.amount - b.amount);
  }

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const visibleTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const transformedTransactions = visibleTransactions.map((transaction) => {
    const formattedDate = new Date(transaction.date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );

    const formattedAmount = `${transaction.amount > 0 ? "+" : "-"}$${Math.abs(
      transaction.amount,
    ).toFixed(2)}`;

    const amountClass =
      transaction.amount > 0 ? styles.positive : styles.negative;

    return {
      ...transaction,
      formattedDate,
      formattedAmount,
      amountClass,
    };
  });

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

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
                className={currentPage === page ? styles["active-page"] : ""}
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
