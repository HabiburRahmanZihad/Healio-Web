"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ShoppingCart, Eye, ArrowRight, Package, ShieldCheck } from "lucide-react";
import { Medicine } from "@/types/medicine.type";
import { useCart } from "@/providers/CartProvider";
import { toast } from "sonner";
import React from "react";

interface MedicineCardProps {
    medicine: Medicine;
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export function MedicineCard({ medicine }: MedicineCardProps) {
    const { addToCart } = useCart();
    const { id, name, price, image, manufacturer, stock, category } = medicine;
    const isOutOfStock = stock === 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(medicine);
        toast.success(`${name} added to cart`, {
            className: "bg-zinc-900 border-primary/50 text-white",
        });
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -8 }}
            className="group relative"
        >
            <Link href={`/medicines/${id}`}>
                <div className="relative overflow-hidden rounded-[2rem] bg-white/[0.03] backdrop-blur-md border border-white/10 transition-all duration-500 group-hover:border-primary/40 group-hover:bg-white/[0.05] group-hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.1)]">
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] overflow-hidden m-2 rounded-[1.5rem]">
                        <Image
                            src={image || "/placeholder-medicine.png"}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Status Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {category && (
                                <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-primary/80 text-white rounded-full backdrop-blur-md">
                                    {category.name}
                                </span>
                            )}
                            {isOutOfStock && (
                                <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-red-500/80 text-white rounded-full backdrop-blur-md">
                                    Deficit
                                </span>
                            )}
                        </div>

                        {/* Hover Overlay Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                            {!isOutOfStock && (
                                <button
                                    onClick={handleAddToCart}
                                    className="p-4 bg-primary text-white rounded-2xl shadow-xl hover:bg-primary/90 transition-all hover:scale-110 active:scale-95"
                                    title="Quick Add"
                                >
                                    <ShoppingCart className="size-6" />
                                </button>
                            )}
                            <div className="p-4 bg-white/20 backdrop-blur-md text-white rounded-2xl shadow-xl border border-white/20 hover:bg-white/30 transition-all hover:scale-110">
                                <Eye className="size-6" />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                                <ShieldCheck className="size-3" />
                                <span>Verified Pharmaceutical</span>
                            </div>
                            <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-primary transition-colors duration-300">
                                {name}
                            </h3>
                            <p className="text-sm text-gray-400 font-medium flex items-center gap-1.5 iterate">
                                <Package className="size-3.5" />
                                {manufacturer}
                            </p>
                        </div>

                        <div className="flex items-end justify-between pt-2 border-t border-white/5">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Pricing</span>
                                <span className="text-2xl font-black text-white">
                                    ৳{price.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <ArrowRight className="size-5 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                                <span className={`text-[10px] font-black uppercase tracking-tighter ${isOutOfStock ? "text-red-500" : "text-primary"
                                    }`}>
                                    {isOutOfStock ? "Empty" : `${stock} Units`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
