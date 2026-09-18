import { useState } from "react";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import classes from "./App.module.css";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";

export default function App() {
  const [activeItemId, setActiveItemId] = useState(1);

  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Paracetamol",
      category: "Painkiller",
      price: 25,
      stock: 35,
    },
    {
      id: 2,
      name: "Cetirizine",
      category: "Antihistamine",
      price: 40,
      stock: 120,
    },
    {
      id: 3,
      name: "Vitamin D3",
      category: "Supplement",
      price: 180,
      stock: 12,
    },
    {
      id: 4,
      name: "Azithromycin",
      category: "Antibiotic",
      price: 95,
      stock: 0,
    },
  ]);

  function handleDeleteMedicine(id) {
    setMedicines((medicines) =>
      medicines.filter((medicine) => medicine.id !== id),
    );
  }

  return (
    <div className={classes.app}>
      <Sidebar activeItemId={activeItemId} setActiveItemId={setActiveItemId} />

      <main className={classes.main}>
        <Header />

        {activeItemId === 1 && <Dashboard medicines={medicines} />}

        {activeItemId === 2 && (
          <Inventory
            medicines={medicines}
            setMedicines={setMedicines}
            onDeleteMedicine={handleDeleteMedicine}
          />
        )}

        {activeItemId === 3 && <Orders />}

        {activeItemId === 4 && <h1>AI Insights</h1>}

        {activeItemId === 5 && <h1>Settings</h1>}
      </main>
    </div>
  );
}
