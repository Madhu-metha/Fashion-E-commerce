import { useEffect, useState } from "react";
import { Card, CardContent, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import axios from "../../lib/axios";

export default function Checkout() {
    const navigate = useNavigate();
    const { cartItems, fetchCartItems } = useCart();
    const [summary, setSummary] = useState({ totalQuantity: 0, totalPrice: 0 });
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
    });

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = () => {
        if (Object.values(formData).some((field) => !field)) {
            alert("Please fill in all details before placing your order");
            return;
        }

        setOrderPlaced(true);
        setTimeout(() => {
            navigate("/order-success");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {/* Address Section */}
                <motion.div
                    className="md:col-span-2 bg-white shadow-lg rounded-2xl p-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Delivery Address
                    </h2>

                    <form className="space-y-5">
                        <TextField
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <TextField
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="Postal Code"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            />
                        </div>
                    </form>
                </motion.div>

                {/* Order Summary */}
                <motion.div
                    className="bg-white shadow-lg rounded-2xl p-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Order Summary
                    </h2>
                    <div className="space-y-3">
                        {cartItems.map((item) => (
                            <Card key={item._id} className="shadow-sm">
                                <CardContent className="flex items-center gap-4">
                                    <img
                                        src={item.productId.image}
                                        alt={item.productId.name}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">{item.productId.name}</p>
                                        <p className="text-gray-500 text-sm">
                                            Qty: {item.quantity}
                                        </p>
                                        <p className="text-pink-500 font-bold">
                                            ₹{item.productId.price}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-6 border-t pt-4 space-y-2">
                        <div className="flex justify-between text-gray-700">
                            <span>Total Items:</span>
                            <span>{summary.totalQuantity}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total Price:</span>
                            <span>₹{summary.totalPrice}</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.5,
                            fontWeight: "bold",
                            backgroundColor: "#ec4899",
                            "&:hover": { backgroundColor: "#db2777" },
                        }}
                        onClick={handlePlaceOrder}
                    >
                        {orderPlaced ? "Placing Order..." : "Place Order"}
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
