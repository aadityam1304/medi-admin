import { useState } from "react";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import classes from "./App.module.css";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import AIInsights from "./pages/AIInsights";
import Settings from "./pages/Settings";

export default function App() {
  const [activeItemId, setActiveItemId] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderId: "ORD001",
      medicineId: 1,
      unitPrice: 25,
      quantity: 2,
      status: "Completed",
    },
    {
      id: 2,
      orderId: "ORD002",
      medicineId: 2,
      unitPrice: 40,
      quantity: 5,
      status: "Pending",
    },
    {
      id: 3,
      orderId: "ORD003",
      medicineId: 3,
      unitPrice: 180,
      quantity: 1,
      status: "Completed",
    },
    {
      id: 4,
      orderId: "ORD004",
      medicineId: 1,
      unitPrice: 25,
      quantity: 3,
      status: "Cancelled",
    },
  ]);

  function handleDeleteMedicine(id) {
    setMedicines((medicines) =>
      medicines.filter((medicine) => medicine.id !== id),
    );
  }

  return (
    <div className={classes.app}>
      <Sidebar
        activeItemId={activeItemId}
        setActiveItemId={setActiveItemId}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className={classes.main}>
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        {activeItemId === 1 && <Dashboard medicines={medicines} />}

        {activeItemId === 2 && (
          <Inventory
            medicines={medicines}
            setMedicines={setMedicines}
            onDeleteMedicine={handleDeleteMedicine}
          />
        )}

        {activeItemId === 3 && (
          <Orders
            medicines={medicines}
            orders={orders}
            setMedicines={setMedicines}
            setOrders={setOrders}
          />
        )}

        {activeItemId === 4 && <AIInsights medicines={medicines} />}

        {activeItemId === 5 && <Settings />}
      </main>
    </div>
  );
}
