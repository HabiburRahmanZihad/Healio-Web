"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Medicine } from "@/types/medicine.type";

export interface CartItem extends Medicine {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (medicine: Medicine) => void;
    removeFromCart: (medicineId: string) => void;
    updateQuantity: (medicineId: string, quantity: number) => void;
    clearCart: () => void;
    totalPrice: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart from localStorage", error);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, isInitialized]);

    const addToCart = (medicine: Medicine) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === medicine.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...medicine, quantity: 1 }];
        });
    };

    const removeFromCart = (medicineId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== medicineId));
    };

    const updateQuantity = (medicineId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(medicineId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === medicineId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalPrice,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
