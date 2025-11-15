import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

import { Link } from "react-router-dom";
import axios from "../../lib/axios";

export default function Cart() {
    const { cartItems, fetchCartItems, removeFromCart } = useCart();
    const [summary, setSummary] = useState({ totalQuantity: 0, totalPrice: 0 });

    useEffect(() => {
        fetchCartItems();

        const fetchSummary = async () => {
            try {
                const { data } = await axios.get("/cart/summary");
                setSummary({
                    totalQuantity: data.totalQuantity || 0,
                    totalPrice: data.totalPrice || 0,
                });
            } catch (error) {
                console.error("Error fetching summary:", error);
            }
        };

        fetchSummary();
    }, [fetchCartItems]);

    if (cartItems.length === 0) {
        return <p className="text-center text-gray-500 mt-10">Your cart is empty 🛒</p>;
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Shopping Bag</h2>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="md:col-span-2 space-y-6">
                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center gap-6 bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
                        >
                            <img
                                src={item.productId.image}
                                alt={item.productId.name}
                                className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{item.productId.name}</h3>
                                <p className="text-gray-500 text-sm">{item.productId.description}</p>
                                <p className="text-pink-500 font-bold mt-2">₹{item.productId.price}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="text-red-500 font-medium hover:text-red-600 transition"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    <div className="flex justify-between mb-2">
                        <span>Total Items:</span>
                        <span>{summary.totalQuantity}</span>
                    </div>
                    <div className="flex justify-between mb-4 font-bold">
                        <span>Total Price:</span>
                        <span>₹{summary.totalPrice}</span>
                    </div>
                    <Link to="/checkout">
                        <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg transition">
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
