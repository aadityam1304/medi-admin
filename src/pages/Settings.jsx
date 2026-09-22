import { useState } from "react";
import classes from "./Settings.module.css";

export default function Settings() {
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [outOfStockAlerts, setOutOfStockAlerts] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  function handleSave() {
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>Settings</h2>
        <p>Manage your pharmacy admin preferences.</p>
      </div>

      {/* Profile */}
      <div className={classes.section}>
        <div className={classes.sectionHeader}>
          <h3>Profile</h3>
          <p>Manage your admin profile information.</p>
        </div>

        <div className={classes.formGrid}>
          <div className={classes.formGroup}>
            <label>Admin Name</label>
            <input type="text" defaultValue="Admin" />
          </div>

          <div className={classes.formGroup}>
            <label>Role</label>
            <input type="text" defaultValue="Pharmacy Manager" />
          </div>

          <div className={classes.formGroup}>
            <label>Email</label>
            <input type="email" defaultValue="admin@mediadmin.com" />
          </div>
        </div>
      </div>

      {/* General Settings */}
      <div className={classes.section}>
        <div className={classes.sectionHeader}>
          <h3>General Settings</h3>
          <p>Manage your basic pharmacy preferences.</p>
        </div>

        <div className={classes.formGrid}>
          <div className={classes.formGroup}>
            <label>Pharmacy Name</label>
            <input type="text" defaultValue="MediAdmin Pharmacy" />
          </div>

          <div className={classes.formGroup}>
            <label>Currency</label>
            <select defaultValue="INR">
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className={classes.section}>
        <div className={classes.sectionHeader}>
          <h3>Notifications</h3>
          <p>Choose which inventory alerts you want to receive.</p>
        </div>

        <div className={classes.notificationList}>
          <div className={classes.notificationItem}>
            <div>
              <strong>Low Stock Alerts</strong>
              <p>Get notified when medicine stock becomes low.</p>
            </div>

            <button
              className={`${classes.toggle} ${
                lowStockAlerts ? classes.toggleActive : ""
              }`}
              onClick={() => setLowStockAlerts((value) => !value)}
            >
              <span></span>
            </button>
          </div>

          <div className={classes.notificationItem}>
            <div>
              <strong>Out of Stock Alerts</strong>
              <p>Get notified when a medicine goes out of stock.</p>
            </div>

            <button
              className={`${classes.toggle} ${
                outOfStockAlerts ? classes.toggleActive : ""
              }`}
              onClick={() => setOutOfStockAlerts((value) => !value)}
            >
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className={classes.actions}>
        <button className={classes.saveButton} onClick={handleSave}>
          Save Settings
        </button>

        {isSaved && (
          <p className={classes.successMessage}>
            ✓ Settings saved successfully
          </p>
        )}
      </div>
    </div>
  );
}
