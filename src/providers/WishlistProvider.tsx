"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Medicine } from "@/types/medicine.type";

interface WishlistContextType {
    wishlist: Medicine[];
    addToWishlist: (medicine: Medicine) => void;
    removeFromWishlist: (medicineId: string) => void;
    toggleWishlist: (medicine: Medicine) => void;
    isInWishlist: (medicineId: string) => boolean;
    wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<Medicine[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist));
            } catch (error) {
                console.error("Failed to parse wishlist from localStorage", error);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }
    }, [wishlist, isInitialized]);

    const addToWishlist = (medicine: Medicine) => {
        setWishlist((prev) => {
            if (prev.find((item) => item.id === medicine.id)) return prev;
            return [...prev, medicine];
        });
    };

    const removeFromWishlist = (medicineId: string) => {
        setWishlist((prev) => prev.filter((item) => item.id !== medicineId));
    };

    const toggleWishlist = (medicine: Medicine) => {
        setWishlist((prev) => {
            const exists = prev.find((item) => item.id === medicine.id);
            if (exists) {
                return prev.filter((item) => item.id !== medicine.id);
            }
            return [...prev, medicine];
        });
    };

    const isInWishlist = (medicineId: string) => {
        return !!wishlist.find((item) => item.id === medicineId);
    };

    const wishlistCount = wishlist.length;

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                isInWishlist,
                wishlistCount,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};
