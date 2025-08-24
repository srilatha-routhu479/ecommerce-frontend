import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const location = useLocation();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setOrderId(params.get("orderId"));
  }, [location]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-2">
        ✅ Order Placed Successfully
      </h1>
      <p className="mb-4">Thank you for shopping with us.</p>

      {orderId && (
        <p className="mb-4">
          <strong>Order ID:</strong> {orderId}
        </p>
      )}

      <div className="flex gap-4">
        <Link to="/" className="px-4 py-2 bg-orange-600 text-white rounded">
          Continue Shopping
        </Link>
        <Link to="/orders" className="px-4 py-2 bg-gray-300 rounded">
          View Orders
        </Link>
      </div>
    </div>
  );
}

