import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import axios from "../lib/axios";

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
}

interface CartItem {
    _id: string;
    productId: Product;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    cartCount: number;
    fetchCartItems: () => Promise<void>;
    addToCart: (productId: string, quantity?: number) => Promise<void>;
    removeFromCart: (id: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartCount, setCartCount] = useState(0);

    const fetchCartItems = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setCartItems([]);
            setCartCount(0);
            return;
        }
        try {
            const { data } = await axios.get("/cart");
            setCartItems(data);
            setCartCount(data.length);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setCartItems([]);
            setCartCount(0);
        }
    };

    const addToCart = async (productId: string, quantity: number = 1) => {
        try {
            await axios.post("/cart", { productId, quantity });
            await fetchCartItems();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const removeFromCart = async (id: string) => {
        try {
            await axios.delete(`/cart/${id}`);
            await fetchCartItems();
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    // Clear cart automatically when token removed (user logged out)
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setCartItems([]);
            setCartCount(0);
            return;
        }
        fetchCartItems();
    }, []);


    return (
        <CartContext.Provider
            value={{ cartItems, cartCount, fetchCartItems, addToCart, removeFromCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
