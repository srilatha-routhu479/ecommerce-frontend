import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/admin/orders", {
  headers: { Authorization: `Bearer ${token}` },
});

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/admin/users", {
  headers: { Authorization: `Bearer ${token}` },
});
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-8 mt-20 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded ${activeTab === "orders" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded ${activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Users
        </button>
      </div>

      {/* Orders Section */}
      {activeTab === "orders" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">All Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Order ID</th>
                  <th className="p-2 border">User</th>
                  <th className="p-2 border">Total</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="p-2 border">{order._id}</td>
                    <td className="p-2 border">{order.user?.name}</td>
                    <td className="p-2 border">₹{order.totalPrice}</td>
                    <td className="p-2 border">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Users Section */}
      {activeTab === "users" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">User ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="p-2 border">{user._id}</td>
                    <td className="p-2 border">{user.name}</td>
                    <td className="p-2 border">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
