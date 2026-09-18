import SummaryCard from "./SummaryCard";
import classes from "./Dashboard.module.css";

export default function Dashboard({ medicines }) {
  const totalMedicine = medicines.length;

  const totalStock = medicines.reduce(
    (total, medicine) => total + medicine.stock,
    0,
  );

  const lowStockMedicine = medicines.filter(
    (medicine) => medicine.stock > 0 && medicine.stock <= 20,
  ).length;

  const outOfStockMedicine = medicines.filter(
    (medicine) => medicine.stock === 0,
  ).length;

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-GB").replaceAll("/", "-");

  return (
    <div>
      <h2>Welcome to Dashboard</h2>

      <h3> Inventory Summary</h3>

      <p className={classes.stockDate}>{formattedDate} · Current Stock</p>
      <div className={classes.summary}>
        <SummaryCard title="Total Medicine" value={totalMedicine} />
        <SummaryCard title="Total Stock" value={totalStock} />
        <SummaryCard title="Low Stock" value={lowStockMedicine} />
        <SummaryCard title="Out of Stock" value={outOfStockMedicine} />
      </div>
    </div>
  );
}
