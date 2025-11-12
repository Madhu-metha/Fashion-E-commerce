import React, { createContext, useContext, useEffect, useState } from "react";

import api from "../lib/axios";

type CartContextType = {
    count: number;
    refresh: () => Promise<void>;
};

const CartContext = createContext<CartContextType>({ count: 0, refresh: async () => { } });

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [count, setCount] = useState(0);

    const refresh = async () => {
        try {
            const { data } = await api.get("/cart/summary"); 
            setCount(data.totalQuantity || 0);
        } catch (err) {
            setCount(0);
        }
    };

    useEffect(() => { refresh(); }, []);

    return (
        <CartContext.Provider value={{ count, refresh }}>
            {children}
        </CartContext.Provider>
    );
};
