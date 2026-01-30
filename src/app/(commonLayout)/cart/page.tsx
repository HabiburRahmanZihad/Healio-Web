"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/providers/CartProvider";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice, itemCount } = useCart();

    if (itemCount === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
                <div className="p-6 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
                    <ShoppingBag className="size-16 text-gray-400" />
                </div>
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-white">Your cart is empty</h1>
                    <p className="text-gray-400 max-w-xs">
                        Looks like you haven't added any medicines to your cart yet.
                    </p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg rounded-xl">
                    <Link href="/medicines">Browse Medicines</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group transition-all duration-300 hover:border-purple-500/30"
                        >
                            <div className="relative size-24 sm:size-32 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/10">
                                <Image
                                    src={item.image || "/placeholder-medicine.png"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                                            {item.name}
                                        </h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                            title="Remove item"
                                        >
                                            <Trash2 className="size-5" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-400">{item.manufacturer}</p>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center bg-black/30 rounded-lg p-1 border border-white/5">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 hover:text-purple-400 transition-colors"
                                        >
                                            <Minus className="size-4" />
                                        </button>
                                        <span className="w-10 text-center text-sm font-medium text-white">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:text-purple-400 transition-colors"
                                        >
                                            <Plus className="size-4" />
                                        </button>
                                    </div>
                                    <span className="text-lg font-bold text-white">
                                        ৳{(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Card */}
                <div className="lg:col-span-1">
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 sticky top-24 space-y-6">
                        <h2 className="text-xl font-bold text-white">Order Summary</h2>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal ({itemCount} items)</span>
                                <span>৳{totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span className="text-green-400 font-medium">Free</span>
                            </div>
                            <div className="h-px bg-white/10 my-4" />
                            <div className="flex justify-between text-lg font-bold text-white">
                                <span>Total</span>
                                <span className="text-purple-400">৳{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button asChild className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 group transition-all duration-300">
                            <Link href="/checkout" className="flex items-center justify-center gap-2">
                                Proceed to Checkout
                                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>

                        <p className="text-xs text-center text-gray-500">
                            Secure checkout powered by Helio Web
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
