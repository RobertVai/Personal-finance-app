import BalanceSummary from "../../components/BalanceSummary/BalanceSummary";
import BudgetsSummary from "../../components/BudgetsSummary/BudgetsSummary";
import PotsSummary from "../../components/PotsSummary/PotsSummary";
import TransactionsSummary from "../../components/TransactionsSummary/TransactionsSummary";

const OverviewPage = () => {
  return (
    <div>
      <BalanceSummary />
      <PotsSummary />
      <TransactionsSummary />
      <BudgetsSummary />
    </div>
  );
};

export default OverviewPage;
