import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../lib/axios";

type Product = {
    _id?: string;
    id?: string;
    name?: string;
    title?: string;
    price: number;
    image?: string;
    category?: string;
    subcategory?: string;
    description?: string;
    brand?: string;
    inStock?: boolean;
};

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetch = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    const handleAddToCart = async () => {
        // check auth token: modify according to your auth flow
        const user = localStorage.getItem("user");
        if (!user) {
            alert("Please log in to add items to your cart.");
            nav("/login");
            return;
        }

        try {
            await api.post("/cart", {
                productId: product._id,
                quantity: 1
            });

            alert("Added to cart!");
        } catch (err: any) {
            console.error("Add To Cart Failed:", err);
            alert(err.response?.data?.message || "Failed to add to cart");
        }
    };

    const handleAddToWishlist = async () => {
        try {
            const user = localStorage.getItem("user");
            if (!user) {
                alert("Please login to continue.");
                nav("/login");
                return;
            }

            await api.post("/wishlist", {
                productId: product?._id
            });
            alert("Added to wishlist!");
        } catch (err: any) {
            console.error("Error adding to wishlist:", err);
            alert(err.response?.data?.message || "Failed to add to wishlist.");
        }
    };

    if (loading) return <div className="py-20 text-center">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found.</div>;

    return (
        <section className="grid md:grid-cols-2 gap-6 container py-10">
            <div>
                <img src={product.image} alt={product.name || product.title} className="w-full object-cover rounded" />
            </div>

            <div className="space-y-4">
                <div className="text-sm text-gray-500">{product.brand}</div>
                <h1 className="text-3xl font-bold">{product.name || product.title}</h1>
                <div className="text-2xl font-bold text-pink-500">₹{product.price}</div>
                <p className="text-gray-600">{product.description}</p>

                <div className="flex gap-4 mt-6">
                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:from-pink-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                        Add to Cart
                    </button>

                    {/* Wishlist Button */}
                    <button
                        onClick={handleAddToWishlist}
                        className="flex-1 border-2 border-pink-500 text-pink-600 font-semibold px-8 py-3 rounded-lg hover:bg-pink-50 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                        Wishlist
                    </button>
                </div>

            </div>
        </section>
    );
}
