import { useState } from "react";
import classes from "./AddMedicineForm.module.css";

export default function AddMedicineForm({ onCancel, onAddMedicine }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newMedicine = {
      id: Date.now(),
      name,
      category,
      price: Number(price),
      stock: Number(stock),
    };
    onAddMedicine(newMedicine);
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h3>Add Medicine</h3>

      <label htmlFor="name">Medicine Name</label>
      <input
        id="name"
        type="text"
        placeholder="Enter Medicine name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="category">Category Name</label>
      <input
        id="category"
        type="text"
        placeholder="Enter Category name"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="number"
        placeholder="Enter Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <label htmlFor="stock">Stock</label>
      <input
        id="stock"
        type="number"
        placeholder="No. pieces"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
      />
      <div className={classes.formActions}>
        <button
          type="button"
          className={classes.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className={classes.submitButton}>
          Add Medicine
        </button>
      </div>
    </form>
  );
}
