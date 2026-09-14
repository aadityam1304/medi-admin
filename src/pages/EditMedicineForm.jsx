import { useState } from "react";
import classes from "./EditMedicineForm.module.css";

export default function EditMedicineForm({
  medicine,
  onUpdateMedicine,
  onCancel,
}) {
  const [name, setName] = useState(medicine.name);
  const [category, setCategory] = useState(medicine.category);
  const [price, setPrice] = useState(medicine.price);
  const [stock, setStock] = useState(medicine.stock);

  function handleSubmit(e) {
    e.preventDefault();

    const updatedMedicine = {
      id: medicine.id,
      name,
      category,
      price: Number(price),
      stock: Number(stock),
    };

    onUpdateMedicine(updatedMedicine);
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h3>Edit Medicine</h3>

      <label htmlFor="name">Medicine Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="category">Category</label>
      <input
        id="category"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <label htmlFor="stock">Stock</label>
      <input
        id="stock"
        type="number"
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
          Save Changes
        </button>
      </div>
    </form>
  );
}
