import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ProductCard, { type Product } from "../../components/ProductCard";
import api from "../../lib/axios";

type Props = {
    title: string;
    categoryKey: "men" | "women" | "kids";
};

export default function CategoryBase({ title, categoryKey }: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                // Example: http://localhost:5000/api/products?category=men
                const { data } = await api.get(`/products?category=${categoryKey}`);

                setProducts(data);
            } catch (err: any) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryKey]);

    // Group by subcategory
    const groupedProducts = products.reduce((acc: any, product) => {
        const key = product.subcategory || "others";
        if (!acc[key]) acc[key] = [];
        acc[key].push(product);
        return acc;
    }, {});

    return (
        <section className="space-y-6 max-w-7xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-2 text-gray-800">{title}</h1>

            {loading ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="text-center text-gray-500"
                >
                    Loading products...
                </motion.p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : products.length === 0 ? (
                <p className="text-center text-gray-500">No products available.</p>
            ) : (
                Object.keys(groupedProducts).map((subcategory) => (
                    <div key={subcategory}>
                        <h2 className="text-2xl font-semibold mb-6 capitalize text-pink-600">
                            {subcategory.replace("-", " ")}
                        </h2>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        >
                            {groupedProducts[subcategory].map((p: Product) => (
                                <motion.div
                                    key={p._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProductCard product={p} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                ))
            )
            }
        </section >
    );
}
