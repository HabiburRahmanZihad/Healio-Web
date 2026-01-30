"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ShoppingCart, Eye, ArrowRight, Package, ShieldCheck, LogIn } from "lucide-react";
import { Medicine } from "@/types/medicine.type";
import { useCart } from "@/providers/CartProvider";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import React from "react";
import { useRouter } from "next/navigation";

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
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const { id, name, price, image, manufacturer, stock, category } = medicine;
    const isOutOfStock = stock === 0;
    const isGuest = !session?.user;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isGuest) {
            router.push("/login");
            return;
        }

        addToCart(medicine);
        toast.success(`${name} added to cart`, {
            className: "bg-zinc-900 border-primary/50 text-white",
        });
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="group relative"
        >
            <Link href={`/medicines/${id}`}>
                <div className="relative overflow-hidden rounded-[1.5rem] bg-white/[0.03] backdrop-blur-md border border-white/10 transition-all duration-500 group-hover:border-primary/30 group-hover:bg-white/[0.05] group-hover:shadow-[0_15px_40px_rgba(var(--primary-rgb),0.08)]">
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] overflow-hidden m-1.5 rounded-xl">
                        <Image
                            src={image || "/placeholder-medicine.png"}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Status Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                            {category && (
                                <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-widest bg-primary/80 text-white rounded-full backdrop-blur-md">
                                    {category.name}
                                </span>
                            )}
                            {isOutOfStock && (
                                <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-widest bg-red-500/80 text-white rounded-full backdrop-blur-md">
                                    Deficit
                                </span>
                            )}
                        </div>

                        {/* Hover Overlay Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                            {!isOutOfStock && (
                                <button
                                    onClick={handleAddToCart}
                                    className="p-3 bg-primary text-white rounded-xl shadow-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
                                    title={isGuest ? "Login to Add" : "Quick Add"}
                                >
                                    {isGuest ? (
                                        <LogIn className="size-5" />
                                    ) : (
                                        <ShoppingCart className="size-5" />
                                    )}
                                </button>
                            )}
                            <div className="p-3 bg-white/20 backdrop-blur-md text-white rounded-xl shadow-lg border border-white/20 hover:bg-white/30 transition-all hover:scale-105">
                                <Eye className="size-5" />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4.5 pt-2 space-y-3">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 text-[8px] font-bold text-primary uppercase tracking-widest">
                                <ShieldCheck className="size-2.5" />
                                <span>Verified Reserve</span>
                            </div>
                            <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-primary transition-colors duration-300">
                                {name}
                            </h3>
                            <p className="text-[10px] text-gray-500 font-medium flex items-center gap-1.5">
                                <Package className="size-3" />
                                {manufacturer}
                            </p>
                        </div>

                        <div className="flex items-end justify-between pt-2 border-t border-white/5">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Pricing</span>
                                <span className="text-lg font-black text-white leading-none mt-0.5">
                                    ৳{price.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex flex-col items-center gap-0.5">
                                <ArrowRight className="size-4 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                                <span className={`text-[8px] font-black uppercase tracking-tighter ${isOutOfStock ? "text-red-500" : "text-primary/70"
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
