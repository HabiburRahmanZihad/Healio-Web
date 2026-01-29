"use client";

import Image from "next/image";
import Link from "next/link";
import { Medicine } from "@/types/medicine.type";
import { useCart } from "@/providers/CartProvider";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

interface MedicineCardProps {
    medicine: Medicine;
}

export function MedicineCard({ medicine }: MedicineCardProps) {
    const { addToCart } = useCart();
    const { id, name, price, image, manufacturer, stock, category } = medicine;
    const isOutOfStock = stock === 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(medicine);
        toast.success(`${name} added to cart`);
    };

    return (
        <Link href={`/medicines/${id}`} className="group">
            <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src={image || "/placeholder-medicine.png"}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-semibold px-3 py-1 bg-red-500 rounded-full text-sm">
                                Out of Stock
                            </span>
                        </div>
                    )}
                    {category && (
                        <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-purple-500/80 text-white rounded-full backdrop-blur-sm">
                            {category.name}
                        </span>
                    )}

                    {/* Add to Cart Overlay Button */}
                    {!isOutOfStock && (
                        <button
                            onClick={handleAddToCart}
                            className="absolute bottom-3 right-3 p-2 bg-purple-600 text-white rounded-xl shadow-lg opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-purple-500"
                            title="Add to Cart"
                        >
                            <ShoppingCart className="size-5" />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-white line-clamp-1 group-hover:text-purple-400 transition-colors">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-400">{manufacturer}</p>
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-bold text-purple-400">
                            ${price.toFixed(2)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${isOutOfStock
                            ? "bg-red-500/20 text-red-400"
                            : "bg-green-500/20 text-green-400"
                            }`}>
                            {isOutOfStock ? "Out of Stock" : `${stock} in stock`}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
