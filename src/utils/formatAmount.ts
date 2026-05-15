export const formatAmount = (amount: number) => {
  return `${amount > 0 ? "+" : "-"}$${Math.abs(amount).toFixed(2)}`;
};
