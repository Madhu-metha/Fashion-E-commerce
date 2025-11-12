import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";

import axios from "../../lib/axios";

export default function Cart() {
    const { cartItems, fetchCartItems } = useContext(CartContext);
    const [summary, setSummary] = useState<{ totalQuantity: number; totalPrice: number }>({
        totalQuantity: 0,
        totalPrice: 0,
    });

    useEffect(() => {
        fetchCartItems();
        const fetchSummary = async () => {
            try {
                const { data } = await axios.get("/cart/summary");
                setSummary({ totalQuantity: data.totalQuantity, totalPrice: data.totalPrice });
            } catch (error) {
                console.error("Error fetching cart summary:", error);
            }
        };
        fetchSummary();
    }, []);

    const handleRemove = async (id: string) => {
        await axios.delete(`/cart/${id}`);
        fetchCartItems();
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Shopping Bag</h2>
            {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty 🛒</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        {cartItems.map((item: any) => (
                            <div key={item._id} className="flex items-center gap-6 bg-white rounded-xl shadow-md p-4">
                                <img src={item.productId.image} alt={item.productId.name} className="w-24 h-24 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{item.productId.name}</h3>
                                    <p className="text-gray-500 text-sm">{item.productId.description}</p>
                                    <p className="text-pink-500 font-bold mt-2">₹{item.productId.price}</p>
                                </div>
                                <button
                                    onClick={() => handleRemove(item._id)}
                                    className="text-red-500 font-medium hover:text-red-600 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

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
                        <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}


// import { useEffect, useState } from "react";

// import api from "../../lib/axios";

// export default function CartPage() {
//     const [items, setItems] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         (async () => {
//             try {
//                 const { data } = await api.get("/cart"); // protected
//                 setItems(data);
//             } catch (err) { console.error(err); }
//             setLoading(false);
//         })();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (!items.length) return <div>Your cart is empty</div>;

//     const total = items.reduce((acc: number, it: any) => {
//         const p = it.productId;
//         return acc + (p?.price || 0) * it.quantity;
//     }, 0);

//     return (
//         <div className="max-w-5xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-4">Cart</h1>
//             {items.map(i => (
//                 <div key={i._id} className="flex gap-4 border p-4 rounded mb-4">
//                     <img src={i.productId.image} className="w-24 h-24 object-contain" />
//                     <div>
//                         <h3 className="font-semibold">{i.productId.name}</h3>
//                         <p>₹{i.productId.price}</p>
//                         <p>Qty: {i.quantity}</p>
//                     </div>
//                 </div>
//             ))}
//             <div className="text-right font-bold">Total: ₹{total}</div>
//             <button className="mt-4 px-6 py-3 bg-pink-500 text-white rounded">Place Order</button>
//         </div>
//     );
// }
