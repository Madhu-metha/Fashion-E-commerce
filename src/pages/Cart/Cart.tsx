import { useEffect, useState } from "react";

import api from "../../lib/axios";

export default function CartPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get("/cart"); // protected
                setItems(data);
            } catch (err) { console.error(err); }
            setLoading(false);
        })();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!items.length) return <div>Your cart is empty</div>;

    const total = items.reduce((acc: number, it: any) => {
        const p = it.productId;
        return acc + (p?.price || 0) * it.quantity;
    }, 0);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>
            {items.map(i => (
                <div key={i._id} className="flex gap-4 border p-4 rounded mb-4">
                    <img src={i.productId.image} className="w-24 h-24 object-contain" />
                    <div>
                        <h3 className="font-semibold">{i.productId.name}</h3>
                        <p>₹{i.productId.price}</p>
                        <p>Qty: {i.quantity}</p>
                    </div>
                </div>
            ))}
            <div className="text-right font-bold">Total: ₹{total}</div>
            <button className="mt-4 px-6 py-3 bg-pink-500 text-white rounded">Place Order</button>
        </div>
    );
}


// export default function Cart() {
//     return (
//         <div className="card p-8 max-w-2xl mx-auto text-center mt-10">
//             <h1 className="text-2xl font-bold mb-4">🛒 Your Shopping Cart</h1>
//             <p className="text-gray-600">
//                 Your cart is currently empty. Add products to proceed to checkout.
//             </p>
//         </div>
//     );
// }
