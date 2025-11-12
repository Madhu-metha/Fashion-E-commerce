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
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to add items to your cart.");
            nav("/login");
            return;
        }

        try {
            await api.post("/cart", { productId: id, quantity: 1 });
            alert("Added to cart!");
        } catch (err: any) {
            console.error(err);
            alert(err?.response?.data?.message || "Failed to add to cart");
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

                <div className="flex gap-3 mt-6 px-6 py-3 bg-pink-500 text-white rounded-lg">
                    <button onClick={handleAddToCart} className="btn-primary">
                        Add to Cart
                    </button>
                    <button className="border rounded px-4 py-2">Wishlist</button>
                </div>
            </div>
        </section>
    );
}
