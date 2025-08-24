import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const [cart, setCart] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [landmark, setLandmark] = useState("");
    const [stateField, setStateField] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/cart", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCart(res.data);
            } catch (err) {
                console.error("Cart fetch error:", err.response?.data || err.message);
            }
        };
        fetchCart();
    }, []);

    const total = cart
        ? (cart.items || []).reduce((sum, item) => {
              const product = item.product || item.productId || {};
              const price = Number(product.price) || 0;
              const qty = Number(item.quantity) || 1;
              return sum + price * qty;
          }, 0)
        : 0;

    // ✅ Place COD order only
    const handlePlaceOrder = async () => {
        if (!name || !phone || !address || !stateField || !postalCode) {
            alert("Please fill all address fields");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:5000/api/orders",
                {
                    products: cart.items.map((item) => ({
                        productId: item.product?._id || item.productId,
                        title: item.product?.name || "Product",
                        price: item.product?.price || 0,
                        quantity: item.quantity,
                    })),
                    shippingAddress: {
                        fullName: name,
                        phone: phone,
                        address,
                        city: landmark || "N/A",
                        state: stateField,
                        postalCode,
                        country: "India",
                    },
                    paymentMethod: "COD",
                    totalAmount: total,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Order response:", res.data);
            resetForm();
            navigate("/order-success"); // ✅ Redirect on success
        } catch (err) {
            console.error("Order Error:", err.response?.data || err.message);
            alert("Failed to place order ❌");
        }
    };

    const resetForm = () => {
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
        setLandmark("");
        setStateField("");
        setPostalCode("");
        setCart(null);
    };

    if (!cart) return <div className="p-10">Loading...</div>;

    return (
        <div className="w-full h-full mx-auto px-4 mt-6 py-18 grid grid-cols-1 md:grid-cols-3 gap-10 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-500">
            {/* Left: Address Form */}
            <div className="md:col-span-2 max-w-3xl space-y-8">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Shipping Details</h2>
                    <div className="space-y-3">
                        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-md"/>
                        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md"/>
                        <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border rounded-md"/>
                        <textarea placeholder="Full Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-2 border rounded-md" rows={3}/>
                        <input type="text" placeholder="Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} className="w-full px-4 py-2 border rounded-md"/>
                        <input type="text" placeholder="State" value={stateField} onChange={(e) => setStateField(e.target.value)} className="w-full px-4 py-2 border rounded-md"/>
                        <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full px-4 py-2 border rounded-md"/>
                    </div>
                </div>
            </div>

            {/* Right: Order Summary */}
            <div className="bg-gray-50 p-6 mt-12 rounded-xl shadow-xl h-fit">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-4">
                    {(cart.items || []).map((item) => {
                        const product = item.product || item.productId || {};
                        const name = product.name || "Product";
                        const price = Number(product.price) || 0;
                        const qty = Number(item.quantity) || 1;

                        // ✅ FIXED: use product.image instead of product.imageUrl
                        const rawSrc = product.image || "";
                        const src = rawSrc
                            ? rawSrc.startsWith("http")
                                ? rawSrc
                                : `http://localhost:5000${rawSrc}` // ✅ backend static path
                            : "/placeholder.svg";

                        return (
                            <div key={item._id} className="flex gap-3 items-center">
                                <img
                                    src={src}
                                    alt={name}
                                    className="w-16 h-16 rounded-md object-cover"
                                    onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                                />
                                <div className="flex-1">
                                    <p className="font-semibold">{name}</p>
                                    <p className="text-sm text-gray-500">Qty: {qty}</p>
                                </div>
                                <p className="font-medium">₹{price * qty}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>
                <button onClick={handlePlaceOrder} className="w-full mt-6 px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition">
                    Place Order (COD)
                </button>
            </div>
        </div>
    );
}


