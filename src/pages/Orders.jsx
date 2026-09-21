import { useState } from "react";
import classes from "./Orders.module.css";

export default function Orders({ medicines, orders, setMedicines, setOrders }) {
  const [selectedMedicineId, setSelectedMedicineId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  function handleCreateOrder() {
    if (!selectedMedicineId) {
      setError("Please select a medicine.");
      return;
    }

    if (quantity <= 0) {
      setError("Quantity must be greater than 0.");
      return;
    }

    const medicine = medicines.find(
      (medicine) => medicine.id === Number(selectedMedicineId),
    );

    if (!medicine) {
      setError("Medicine not found.");
      return;
    }

    if (quantity > medicine.stock) {
      setError(
        `Only ${medicine.stock} units of ${medicine.name} are available.`,
      );
      return;
    }

    const newOrder = {
      id: Date.now(),
      orderId: `ORD${String(orders.length + 1).padStart(3, "0")}`,
      medicineId: medicine.id,
      unitPrice: medicine.price,
      quantity,
      status: "Pending",
    };

    setOrders((orders) => [...orders, newOrder]);

    setMedicines((medicines) =>
      medicines.map((medicine) =>
        medicine.id === newOrder.medicineId
          ? {
              ...medicine,
              stock: medicine.stock - quantity,
            }
          : medicine,
      ),
    );

    setSelectedMedicineId("");
    setQuantity(1);
  }

  function handleStatusChange(orderId, newStatus) {
    const order = orders.find((order) => order.id === orderId);

    if (!order) return;

    if (order.status === newStatus) return;

    // Restore stock when an active order is cancelled
    if (newStatus === "Cancelled" && order.status !== "Cancelled") {
      setMedicines((medicines) =>
        medicines.map((medicine) =>
          medicine.id === order.medicineId
            ? {
                ...medicine,
                stock: medicine.stock + order.quantity,
              }
            : medicine,
        ),
      );
    }

    // Remove restored stock if a cancelled order becomes active again
    if (order.status === "Cancelled" && newStatus !== "Cancelled") {
      const medicine = medicines.find(
        (medicine) => medicine.id === order.medicineId,
      );

      if (!medicine || medicine.stock < order.quantity) {
        return;
      }

      setMedicines((medicines) =>
        medicines.map((medicine) =>
          medicine.id === order.medicineId
            ? {
                ...medicine,
                stock: medicine.stock - order.quantity,
              }
            : medicine,
        ),
      );
    }

    setOrders((orders) =>
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order,
      ),
    );
  }

  const filteredOrders = orders.filter((order) => {
    const medicine = medicines.find(
      (medicine) => medicine.id === order.medicineId,
    );

    const matchesSearch =
      search === "" ||
      order.orderId.toLowerCase().includes(search.toLowerCase()) ||
      medicine.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  {
    /* Filter Orders */
  }
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed",
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled",
  ).length;

  return (
    <div>
      <h2>Orders</h2>

      <div className={classes.summary}>
        <div className={classes.summaryCard}>
          <p>Total Orders</p>
          <h3>{totalOrders}</h3>
        </div>

        <div className={classes.summaryCard}>
          <p>Pending</p>
          <h3>{pendingOrders}</h3>
        </div>

        <div className={classes.summaryCard}>
          <p>Completed</p>
          <h3>{completedOrders}</h3>
        </div>

        <div className={classes.summaryCard}>
          <p>Cancelled</p>
          <h3>{cancelledOrders}</h3>
        </div>
      </div>

      {/* Search and Filter */}
      <div className={classes.filters}>
        <input
          type="text"
          placeholder="Search order or medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Create Order */}
      <div className={classes.form}>
        <h3>Create Order</h3>

        <div className={classes.formRow}>
          <select
            value={selectedMedicineId}
            onChange={(e) => {
              setSelectedMedicineId(e.target.value);
              setError("");
            }}
          >
            <option value="">Select medicine</option>

            {medicines
              .filter((medicine) => medicine.stock > 0)
              .map((medicine) => (
                <option key={medicine.id} value={medicine.id}>
                  {medicine.name}
                </option>
              ))}
          </select>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => {
              setQuantity(Number(e.target.value));
              setError("");
            }}
          />

          <button onClick={handleCreateOrder}>Create Order</button>
        </div>

        {error && <p className={classes.error}>{error}</p>}
      </div>

      {/* Orders Table */}
      <div className={classes.container}>
        <div className={classes.header}>
          <h3>Recent Orders</h3>
        </div>

        <div className={classes.table}>
          <div className={classes.tableHeader}>
            <p>Order ID</p>
            <p>Medicine</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Status</p>
          </div>

          {selectedOrder && (
            <div className={classes.orderDetails}>
              <div className={classes.orderDetailsHeader}>
                <h3>Order Details</h3>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className={classes.closeButton}
                >
                  ×
                </button>
              </div>

              <div className={classes.orderDetailsContent}>
                <p>
                  <strong>Order ID:</strong> {selectedOrder.orderId}
                </p>

                <p>
                  <strong>Medicine:</strong>{" "}
                  {
                    medicines.find(
                      (medicine) => medicine.id === selectedOrder.medicineId,
                    )?.name
                  }
                </p>

                <p>
                  <strong>Quantity:</strong> {selectedOrder.quantity}
                </p>

                <p>
                  <strong>Unit Price:</strong> ₹{selectedOrder.unitPrice}
                </p>

                <p>
                  <strong>Total:</strong> ₹
                  {selectedOrder.unitPrice * selectedOrder.quantity}
                </p>

                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
              </div>
            </div>
          )}

          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const medicine = medicines.find(
                (medicine) => medicine.id === order.medicineId,
              );

              const total = order.unitPrice * order.quantity;

              return (
                <div key={order.id} className={classes.tableRow}>
                  <p
                    className={classes.orderId}
                    onClick={() => setSelectedOrder(order)}
                  >
                    {order.orderId}
                  </p>
                  <p>{medicine.name}</p>
                  <p>{order.quantity}</p>
                  <p>₹{total}</p>

                  <select
                    className={`${classes.status} ${
                      order.status === "Pending"
                        ? classes.pending
                        : order.status === "Completed"
                          ? classes.completed
                          : classes.cancelled
                    }`}
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              );
            })
          ) : (
            <div className={classes.emptyState}>
              <p>No orders found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
