import { useMemo, useState } from "react";
import styles from "../pages/TransactionsPage/TransactionsPage.module.css"
import { financeData } from "../data/financeData";
import { formatAmount } from "../utils/formatAmount";
import { formatDate } from "../utils/formatDate";
import type { SortBy, TransactionSortItem } from "../types/sortingTypes";

const ITEMS_PER_PAGE = 10;
export const useFilterTranscations = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("latest");
  const [category, setCategory] = useState("All Transactions");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "All Transactions",
    ...new Set(financeData.transactions.map((item) => item.category)),
  ];

  const filteredTransactions = useMemo(() => {
    let result = financeData.transactions;

    if (searchValue) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    if (category !== "All Transactions") {
      result = result.filter((item) => item.category === category);
    }

    const sortFns = {
      latest: (a: TransactionSortItem, b: TransactionSortItem) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
      oldest: (a: TransactionSortItem, b: TransactionSortItem) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
      highest: (a: TransactionSortItem, b: TransactionSortItem) =>
        b.amount - a.amount,
      lowest: (a: TransactionSortItem, b: TransactionSortItem) =>
        a.amount - b.amount,
    };

    return result.toSorted(sortFns[sortBy] ?? sortFns.latest);
  }, [searchValue, category, sortBy]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const visibleTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const transformedTransactions = visibleTransactions.map((transaction) => {
    const formattedDate = formatDate(transaction.date);

    const formattedAmount = formatAmount(transaction.amount);

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

  const handleSortChange = (value: SortBy) => {
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
