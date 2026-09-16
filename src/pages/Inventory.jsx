import { useState } from "react";
import classes from "./Inventory.module.css";
import AddMedicineForm from "./AddMedicineForm";
import EditMedicineForm from "./EditMedicineForm";

export default function Inventory({
  medicines,
  setMedicines,
  onDeleteMedicine,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingMedicineId, setEditingMedicineId] = useState(null);
  const [deletingMedicineId, setDeletingMedicineId] = useState(null);

  // Update Stock state
  const [stockUpdateMedicineId, setStockUpdateMedicineId] = useState(null);
  const [stockToAdd, setStockToAdd] = useState("");
  const [stockError, setStockError] = useState("");

  const filteredMedicines = medicines.filter((medicine) => {
    let status;

    if (medicine.stock === 0) {
      status = "Out of Stock";
    } else if (medicine.stock <= 20) {
      status = "Low Stock";
    } else {
      status = "In Stock";
    }

    return (
      (medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || status === statusFilter)
    );
  });

  function handleAddMedicine(newMedicine) {
    setMedicines((medicines) => [...medicines, newMedicine]);
    setShowForm(false);
  }

  const medicineToEdit = medicines.find(
    (medicine) => medicine.id === editingMedicineId,
  );

  const medicineToDelete = medicines.find(
    (medicine) => medicine.id === deletingMedicineId,
  );

  const medicineToUpdateStock = medicines.find(
    (medicine) => medicine.id === stockUpdateMedicineId,
  );

  function handleEditMedicine(id) {
    setEditingMedicineId(id);
  }

  function handleUpdateMedicine(updatedMedicine) {
    setMedicines((medicines) =>
      medicines.map((medicine) =>
        medicine.id === updatedMedicine.id ? updatedMedicine : medicine,
      ),
    );

    setEditingMedicineId(null);
  }

  function handleUpdateStock() {
    const quantity = Number(stockToAdd);

    if (quantity <= 0) {
      setStockError("Please enter a quantity greater than 0.");
      return;
    }

    setMedicines((medicines) =>
      medicines.map((medicine) =>
        medicine.id === stockUpdateMedicineId
          ? { ...medicine, stock: medicine.stock + quantity }
          : medicine,
      ),
    );

    setStockUpdateMedicineId(null);
    setStockToAdd("");
    setStockError("");
  }

  function handleCancelStockUpdate() {
    setStockUpdateMedicineId(null);
    setStockToAdd("");
    setStockError("");
  }

  function handleConfirmDelete() {
    onDeleteMedicine(deletingMedicineId);
    setDeletingMedicineId(null);
  }

  return (
    <div className={classes.inventory}>
      <h2 className={classes.heading}>Medicine Inventory</h2>

      <input
        className={classes.searchInput}
        type="text"
        placeholder="Search medicine"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        className={classes.statusFilter}
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="In Stock">In Stock</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>

      <button className={classes.addButton} onClick={() => setShowForm(true)}>
        + Add Medicine
      </button>

      {showForm && (
        <AddMedicineForm
          onCancel={() => setShowForm(false)}
          onAddMedicine={handleAddMedicine}
        />
      )}

      {medicineToEdit && (
        <EditMedicineForm
          medicine={medicineToEdit}
          onUpdateMedicine={handleUpdateMedicine}
          onCancel={() => setEditingMedicineId(null)}
        />
      )}

      {medicineToDelete && (
        <div className={classes.deleteConfirmation}>
          <p>
            Are you sure you want to delete{" "}
            <strong>{medicineToDelete.name}</strong>?
          </p>

          <div className={classes.deleteActions}>
            <button
              className={classes.cancelDeleteButton}
              onClick={() => setDeletingMedicineId(null)}
            >
              Cancel
            </button>

            <button
              className={classes.confirmDeleteButton}
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {medicineToUpdateStock && (
        <div className={classes.stockUpdateCard}>
          <h3>Update Stock</h3>

          <p>
            Medicine: <strong>{medicineToUpdateStock.name}</strong>
          </p>

          <p>
            Current Stock: <strong>{medicineToUpdateStock.stock}</strong>
          </p>

          <input
            className={classes.stockInput}
            type="number"
            value={stockToAdd}
            onChange={(e) => setStockToAdd(e.target.value)}
            placeholder="Enter quantity"
          />

          {stockError && <p className={classes.stockError}>{stockError}</p>}

          <div className={classes.stockActions}>
            <button
              className={classes.updateStockButton}
              onClick={handleUpdateStock}
            >
              Add Stock
            </button>

            <button
              className={classes.cancelStockButton}
              onClick={handleCancelStockUpdate}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredMedicines.length === 0 ? (
            <tr>
              <td colSpan="6">No medicines found</td>
            </tr>
          ) : (
            filteredMedicines.map((medicine) => {
              let status;
              let statusClass;

              if (medicine.stock === 0) {
                status = "Out of Stock";
                statusClass = classes.stockOut;
              } else if (medicine.stock <= 20) {
                status = "Low Stock";
                statusClass = classes.stockLow;
              } else {
                status = "In Stock";
                statusClass = classes.stockIn;
              }

              return (
                <tr key={medicine.id}>
                  <td>{medicine.name}</td>
                  <td>{medicine.category}</td>
                  <td>₹{medicine.price}</td>
                  <td>{medicine.stock}</td>
                  <td className={statusClass}>{status}</td>

                  <td>
                    <button
                      onClick={() => handleEditMedicine(medicine.id)}
                      className={classes.editButton}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeletingMedicineId(medicine.id)}
                      className={classes.deleteButton}
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => {
                        setStockUpdateMedicineId(medicine.id);
                        setStockToAdd("");
                        setStockError("");
                      }}
                      className={classes.stockButton}
                    >
                      Update Stock
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
