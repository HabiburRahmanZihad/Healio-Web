"use client";

import Image from "next/image";
import Link from "next/link";
import { Medicine } from "@/types/medicine.type";
import { useCart } from "@/providers/CartProvider";
import { useWishlist } from "@/providers/WishlistProvider";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MedicineDetailsClientProps {
    medicine: Medicine;
}

export function MedicineDetailsClient({ medicine }: MedicineDetailsClientProps) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { id, name, description, price, stock, image, manufacturer, category, requiresPrescription } = medicine;
    const isOutOfStock = stock === 0;

    const handleAddToCart = () => {
        addToCart(medicine);
        toast.success(`${name} added to cart`);
    };

    const handleToggleWishlist = () => {
        toggleWishlist(medicine);
        if (isInWishlist(id)) {
            toast.success(`${name} removed from wishlist`);
        } else {
            toast.success(`${name} added to wishlist`);
        }
    };

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center gap-2 text-sm text-gray-400">
                        <li><Link href="/" className="hover:text-purple-400">Home</Link></li>
                        <li>/</li>
                        <li><Link href="/medicines" className="hover:text-purple-400">Medicines</Link></li>
                        <li>/</li>
                        <li className="text-purple-400">{name}</li>
                    </ol>
                </nav>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Image */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                        <Image
                            src={image || "/placeholder-medicine.png"}
                            alt={name}
                            fill
                            className="object-cover"
                            priority
                        />
                        {category && (
                            <span className="absolute top-4 left-4 px-3 py-1 text-sm font-medium bg-purple-500/80 text-white rounded-full backdrop-blur-sm">
                                {category.name}
                            </span>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {name}
                            </h1>
                            <p className="text-lg text-gray-400">{manufacturer}</p>
                        </div>

                        <div className="text-4xl font-bold text-purple-400">
                            ${price.toFixed(2)}
                        </div>

                        <p className="text-gray-300 leading-relaxed">
                            {description}
                        </p>

                        {/* Stock Status */}
                        <div className="flex items-center gap-4">
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${isOutOfStock
                                ? "bg-red-500/20 text-red-400"
                                : "bg-green-500/20 text-green-400"
                                }`}>
                                {isOutOfStock ? "Out of Stock" : `${stock} in stock`}
                            </span>
                            {requiresPrescription && (
                                <span className="px-4 py-2 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-400">
                                    Prescription Required
                                </span>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${isOutOfStock
                                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90"
                                    }`}
                            >
                                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                            </button>
                            <button
                                onClick={handleToggleWishlist}
                                className={cn(
                                    "px-6 py-4 rounded-xl border transition-all",
                                    isInWishlist(id)
                                        ? "bg-pink-500/10 border-pink-500 text-pink-500"
                                        : "border-white/20 text-white hover:bg-white/5"
                                )}
                            >
                                <svg className={cn("w-6 h-6", isInWishlist(id) && "fill-current")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Back Link */}
                        <Link
                            href="/medicines"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors pt-4"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Medicines
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
