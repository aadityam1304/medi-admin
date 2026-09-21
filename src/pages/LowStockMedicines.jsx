import classes from "./LowStockMedicines.module.css";

export default function LowStockMedicines({ medicines, count }) {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h3>Low Stock Medicines</h3>

        <span className={classes.count}>{count}</span>
      </div>

      {medicines.length === 0 ? (
        <p className={classes.empty}>Stock is good. No low stock medicines.</p>
      ) : (
        medicines.map((medicine) => (
          <div key={medicine.id} className={classes.medicine}>
            <div>
              <p className={classes.name}>{medicine.name}</p>
              <p className={classes.category}>{medicine.category}</p>
            </div>

            <div className={classes.stockInfo}>
              <p className={classes.stock}>{medicine.stock} units</p>

              <span className={classes.badge}>Low Stock</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
