import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import api from "../lib/axios";

export default function ProductCard({ product }: any) {
    const { fetchCartItems } = useCart();
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem("user"); // or use auth context

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            // show message then redirect to login
            alert("Please login to add items to cart.");
            navigate("/login");
            return;
        }

        try {
            await api.post("/cart", {
                productId: product._id,
                quantity: 1
            });

            await fetchCartItems();
            alert("Product added to cart!");
            
        } catch (error) {
            console.error(error);
            alert("Unable to add product to cart");
        }
    };

    return (

        <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition overflow-hidden">
            <Link to={`/product/${product._id || product.id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover rounded-lg"
                />
            </Link>

            <div className="mt-3 text-center">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-pink-500 font-bold mt-1">₹{product.price}</p>

                <div className="flex justify-center gap-2 mt-4">
                    <Link
                        to={`/product/${product._id || product.id}`}
                        className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
                    >
                        View
                    </Link>
                    <button
                        onClick={handleAddToCart}
                        className="border border-pink-500 text-pink-500 px-4 py-2 rounded-md hover:bg-pink-50"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
