import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function OrderSuccess() {
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        // Stop confetti after 5 seconds
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-pink-50 to-white p-6 text-center">
            {showConfetti && <Confetti numberOfPieces={250} recycle={false} />}

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md"
            >
                <CheckCircleIcon
                    sx={{ fontSize: 90 }}
                    className="text-pink-500 mb-4 animate-bounce"
                />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Order Placed Successfully!
                </h1>
                <p className="text-gray-600 mb-6">
                    Thank you for shopping with <span className="text-pink-500 font-semibold">Auréna</span> 💖
                </p>

                <div className="bg-gray-50 border rounded-xl p-4 mb-6 text-left">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">
                        Order Details
                    </h2>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>Order ID: #{Math.floor(Math.random() * 1000000)}</li>
                        <li>Date: {new Date().toLocaleDateString()}</li>
                        <li>Expected Delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</li>
                    </ul>
                </div>

                <Button
                    variant="contained"
                    onClick={() => navigate("/")}
                    sx={{
                        mt: 2,
                        backgroundColor: "#ec4899",
                        "&:hover": { backgroundColor: "#db2777" },
                        fontWeight: "bold",
                    }}
                    fullWidth
                >
                    Continue Shopping
                </Button>
            </motion.div>

            <p className="text-gray-500 mt-6 text-sm">
                You will receive a confirmation email shortly.
            </p>
        </div>
    );
}
