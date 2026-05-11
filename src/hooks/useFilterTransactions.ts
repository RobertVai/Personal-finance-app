import { useState } from "react";
import styles from "../pages/Transactions/Transactions.module.css";
import { financeData } from "../data/financeData";

const ITEMS_PER_PAGE = 10;
export const useFilterTranscations = () => {
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

  return {
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
  };
};
