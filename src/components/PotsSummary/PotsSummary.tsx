import styles from "./PotsSummary.module.css";
import { financeData } from "../../data/financeData";

const PotsSummary = () => {
  const filteredPots = financeData.pots.filter((p) => p.name !== "Holiday");

  const total = financeData.pots.reduce((acc, pot) => {
    return acc + pot.total;
  }, 0);
  return (
    <div>
      <p>Total saved {total}</p>
      {filteredPots.map((p) => (
        <div key={p.name}>
          <p>{p.name}</p>
          <p>{p.total}</p>
        </div>
      ))}
    </div>
  );
};

export default PotsSummary;
