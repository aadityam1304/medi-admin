import classes from "./AIInsights.module.css";

export default function AIInsights({ medicines }) {
  const outOfStockMedicines = medicines.filter(
    (medicine) => medicine.stock === 0,
  );

  const lowStockMedicines = medicines.filter(
    (medicine) => medicine.stock > 0 && medicine.stock <= 20,
  );

  const healthyStockMedicines = medicines.filter(
    (medicine) => medicine.stock > 20,
  );

  const recommendations = [];

  outOfStockMedicines.forEach((medicine) => {
    recommendations.push({
      id: medicine.id,
      title: `Restock ${medicine.name}`,
      message: "This medicine is currently out of stock.",
    });
  });

  lowStockMedicines.forEach((medicine) => {
    recommendations.push({
      id: medicine.id,
      title: `Monitor ${medicine.name}`,
      message: `Only ${medicine.stock} units are remaining.`,
    });
  });

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>AI Insights</h2>
        <p>
          Smart insights and recommendations based on your medicine inventory.
        </p>
      </div>

      <div className={classes.alertGrid}>
        {/* Out of Stock */}
        <div className={classes.alertCard}>
          <div className={classes.cardHeader}>
            <div>
              <h3>⚠️ Out of Stock</h3>
              <p>Immediate attention required</p>
            </div>

            <span className={`${classes.count} ${classes.dangerCount}`}>
              {outOfStockMedicines.length}
            </span>
          </div>

          {outOfStockMedicines.length > 0 ? (
            outOfStockMedicines.map((medicine) => (
              <div key={medicine.id} className={classes.alertItem}>
                <strong>{medicine.name}</strong>
                <span>Currently out of stock</span>
              </div>
            ))
          ) : (
            <div className={classes.emptyState}>
              <span>✓</span>
              <p>No medicines are currently out of stock.</p>
            </div>
          )}
        </div>

        {/* Low Stock */}
        <div className={classes.alertCard}>
          <div className={classes.cardHeader}>
            <div>
              <h3>🟠 Low Stock</h3>
              <p>Monitor these medicines</p>
            </div>

            <span className={`${classes.count} ${classes.warningCount}`}>
              {lowStockMedicines.length}
            </span>
          </div>

          {lowStockMedicines.length > 0 ? (
            lowStockMedicines.map((medicine) => (
              <div key={medicine.id} className={classes.alertItem}>
                <strong>{medicine.name}</strong>
                <span>{medicine.stock} units remaining</span>
              </div>
            ))
          ) : (
            <div className={classes.emptyState}>
              <span>✓</span>
              <p>No medicines are currently low on stock.</p>
            </div>
          )}
        </div>
      </div>

      {/* Smart Recommendations */}
      <div className={classes.recommendationCard}>
        <h3>💡 Smart Recommendations</h3>

        {recommendations.length > 0 ? (
          recommendations.map((recommendation) => (
            <div key={recommendation.id} className={classes.recommendationItem}>
              <div className={classes.recommendationIcon}>💡</div>

              <div className={classes.recommendationContent}>
                <strong>{recommendation.title}</strong>
                <p>{recommendation.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Your inventory is currently in good condition.</p>
        )}
      </div>

      {/* Inventory Health */}
      <div className={classes.healthCard}>
        <div className={classes.healthHeader}>
          <div>
            <h3>📊 Inventory Health</h3>
            <p>Current overview of your medicine inventory</p>
          </div>
        </div>

        <div className={classes.healthGrid}>
          <div className={`${classes.healthItem} ${classes.total}`}>
            <span>Total Medicines</span>
            <strong>{medicines.length}</strong>
          </div>

          <div className={`${classes.healthItem} ${classes.healthy}`}>
            <span>Healthy Stock</span>
            <strong>{healthyStockMedicines.length}</strong>
          </div>

          <div className={`${classes.healthItem} ${classes.low}`}>
            <span>Low Stock</span>
            <strong>{lowStockMedicines.length}</strong>
          </div>

          <div className={`${classes.healthItem} ${classes.out}`}>
            <span>Out of Stock</span>
            <strong>{outOfStockMedicines.length}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
