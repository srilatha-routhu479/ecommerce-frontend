import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
        const res = await axios.get("http://localhost:5000/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">⏳ Loading your orders...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">❌ {error}</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center mt-10">📭 You have no past orders.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">My Orders</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Order ID: <span className="text-gray-600">{order._id}</span>
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.isDelivered ? "Delivered" : "Processing"}
              </span>
            </div>

            {/* Order Items */}
            <div className="divide-y divide-gray-200">
              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-gray-600 text-sm">
                        Qty: {item.qty} × ₹{item.product.price}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ₹{item.qty * item.product.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <p>
                Placed on:{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="font-semibold text-gray-900">
                Total: ₹{order.totalPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;


