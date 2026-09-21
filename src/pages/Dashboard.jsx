import SummaryCard from "./SummaryCard";
import StockDistribution from "./StockDistribution";
import LowStockMedicines from "./LowStockMedicines";
import classes from "./Dashboard.module.css";

export default function Dashboard({ medicines }) {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-GB").replaceAll("/", "-");

  const totalMedicine = medicines.length;

  const totalStock = medicines.reduce(
    (total, medicine) => total + medicine.stock,
    0,
  );

  const lowStockMedicines = medicines.filter(
    (medicine) => medicine.stock > 0 && medicine.stock <= 20,
  );

  const lowStockMedicine = lowStockMedicines.length;

  const outOfStockMedicine = medicines.filter(
    (medicine) => medicine.stock === 0,
  ).length;

  const inStockQuantity = medicines.reduce(
    (total, medicine) => (medicine.stock > 20 ? total + medicine.stock : total),
    0,
  );

  const lowStockQuantity = medicines.reduce(
    (total, medicine) =>
      medicine.stock > 0 && medicine.stock <= 20
        ? total + medicine.stock
        : total,
    0,
  );

  const outOfStockQuantity = medicines.reduce(
    (total, medicine) =>
      medicine.stock === 0 ? total + medicine.stock : total,
    0,
  );

  return (
    <div>
      <div className={classes.dashboardHeader}>
        <h2>Welcome to Dashboard</h2>

        <h3>Inventory Summary</h3>

        <p className={classes.stockDate}>{formattedDate} · Current Stock</p>
      </div>

      <div className={classes.summary}>
        <SummaryCard title="Total Medicine" value={totalMedicine} />
        <SummaryCard title="Total Stock" value={totalStock} />
        <SummaryCard title="Low Stock" value={lowStockMedicine} />
        <SummaryCard title="Out of Stock" value={outOfStockMedicine} />
      </div>

      <div className={classes.dashboardGrid}>
        <StockDistribution
          totalStock={totalStock}
          inStockQuantity={inStockQuantity}
          lowStockQuantity={lowStockQuantity}
          outOfStockQuantity={outOfStockQuantity}
        />

        <LowStockMedicines
          medicines={lowStockMedicines}
          count={lowStockMedicine}
        />
      </div>
    </div>
  );
}
