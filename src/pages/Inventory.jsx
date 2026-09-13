import { useState } from "react";
import classes from "./Inventory.module.css";
import AddMedicineForm from "./AddMedicineForm";
import EditMedicineForm from "./EditMedicineForm";

export default function Inventory({ medicines, setMedicines }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingMedicineId, setEditingMedicineId] = useState(null);

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
      </button>{" "}
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
        />
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
