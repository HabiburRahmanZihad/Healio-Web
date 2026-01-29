"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { Medicine } from "@/types/medicine.type";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

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
    const { data: session } = authClient.useSession();
    const prevUserIdRef = useRef<string | undefined>(undefined);

    const getCartKey = () => (session?.user?.id ? `cart_${session.user.id}` : null);

    // Initial load and session change handling
    useEffect(() => {
        const currentUserId = session?.user?.id;

        // If user changed (login/logout/switch)
        if (currentUserId !== prevUserIdRef.current) {
            const key = getCartKey();
            if (key) {
                const savedCart = localStorage.getItem(key);
                if (savedCart) {
                    try {
                        setCart(JSON.parse(savedCart));
                    } catch (error) {
                        console.error("Failed to parse cart from localStorage", error);
                        setCart([]);
                    }
                } else {
                    setCart([]);
                }
            } else {
                // Not logged in, clear cart state
                setCart([]);
            }
            prevUserIdRef.current = currentUserId;
        }
        setIsInitialized(true);
    }, [session]);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            const key = getCartKey();
            if (key) {
                localStorage.setItem(key, JSON.stringify(cart));
            } else if (prevUserIdRef.current) {
                // If we had a key but now don't (logout), don't touch localStorage
                // but the state is already cleared by the previous effect
            }
        }
    }, [cart, isInitialized, session]);

    const addToCart = (medicine: Medicine) => {
        if ((session?.user as any)?.role === "SELLER") {
            toast.error("Sellers cannot add items to cart");
            return;
        }

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
