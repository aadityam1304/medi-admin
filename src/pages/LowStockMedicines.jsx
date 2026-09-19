import classes from "./LowStockMedicines.module.css";

export default function LowStockMedicines({ medicines }) {
  return (
    <div className={classes.container}>
      <h3>Low Stock Medicines</h3>

      {medicines.length === 0 && <p>Stock is good. No low stock medicines.</p>}

      {medicines.map((medicine) => (
        <div key={medicine.id} className={classes.medicine}>
          <div key={medicine.id} className={classes.medicine}>
            <p className={classes.name}>{medicine.name}</p>
            <p className={classes.category}>{medicine.category}</p>
            <p className={classes.stock}>{medicine.stock} units</p>
            <span className={classes.badge}>Low Stock</span>
          </div>
        </div>
      ))}
    </div>
  );
}
