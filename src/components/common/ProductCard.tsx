import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import api from "../../lib/axios";

export default function ProductCard({ product }: any) {
    const { refresh } = useCart();
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem("token"); // or use auth context

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            // show message then redirect to login
            alert("Please login to add items to cart.");
            navigate("/login");
            return;
        }

        try {
            await api.post("/cart", { productId: product._id, quantity: 1 });
            await refresh();
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


// import { Link } from "react-router-dom";

// export interface Product {
//     _id?: string;
//     id?: string;
//     title: string;
//     price: number;
//     image: string;
//     category: string;
//     subcategory: string;
//     description?: string;
//     brand?: string;
//     rating?: number;
// }

// export default function ProductCard({ product }: { product: Product }) {
//     return (
//         <div className="card overflow-hidden group hover:shadow-md transition">
//             <Link to={`/product/${product.id}`}>
//                 <img
//                     src={product.image}
//                     alt={product.title}
//                     className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
//                 />
//             </Link>

//             <div className="p-4">
//                 {/* Brand */}
//                 <div className="text-xs text-gray-500">{product.brand}</div>

//                 {/* Title */}
//                 <h3 className="font-semibold line-clamp-1">{product.title}</h3>

//                 {/* Price */}
//                 <div className="mt-1 font-bold">₹{product.price}</div>

//                 {/* Buttons */}
//                 <div className="mt-3 flex gap-2">
//                     <Link to={`/product/${product.id}`} className="btn-primary text-sm">
//                         View
//                     </Link>
//                     <button className="border border-gray-200 rounded-xl px-3 py-2 text-sm hover:bg-gray-50 transition">
//                         Add to Cart
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
