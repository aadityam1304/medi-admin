import classes from "./StockDistribution.module.css";

export default function StockDistribution({
  totalStock,
  inStockQuantity,
  lowStockQuantity,
  outOfStockQuantity,
}) {
  const inStockPercentage =
    totalStock > 0 ? (inStockQuantity / totalStock) * 100 : 0;
  const lowStockPercentage =
    totalStock > 0 ? (lowStockQuantity / totalStock) * 100 : 0;
  const outOfStockPercentage =
    totalStock > 0 ? (outOfStockQuantity / totalStock) * 100 : 0;
  return (
    <div className={classes.container}>
      <h3>Stock Distribution</h3>

      <div className={classes.stockItem}>
        <div className={classes.stockHeader}>
          <p>In Stock</p>
          <p>{inStockQuantity} units</p>
        </div>
        <div className={classes.barWrapper}>
          <div className={classes.bar}>
            <div
              className={`${classes.barFill} ${classes.inStock}`}
              style={{
                width: `${inStockPercentage}%`,
              }}
            ></div>
          </div>
          <span>{inStockPercentage.toFixed(1)}%</span>
        </div>
      </div>

      <div className={classes.stockItem}>
        <div className={classes.stockHeader}>
          <p>Low Stock</p>
          <p>{lowStockQuantity} units</p>
        </div>
        <div className={classes.barWrapper}>
          <div className={classes.bar}>
            <div
              className={`${classes.barFill} ${classes.lowStock}`}
              style={{
                width: `${lowStockPercentage}%`,
              }}
            ></div>
          </div>
          <span>{lowStockPercentage.toFixed(1)}%</span>
        </div>
      </div>
      <div className={classes.stockItem}>
        <div className={classes.stockHeader}>
          <p>Out of Stock</p>
          <p>{outOfStockQuantity} units</p>
        </div>
        <div className={classes.barWrapper}>
          <div className={classes.bar}>
            <div
              className={`${classes.barFill} ${classes.outOfStock}`}
              style={{
                width: `${outOfStockPercentage}%`,
              }}
            ></div>
          </div>
          <span>{outOfStockPercentage.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
