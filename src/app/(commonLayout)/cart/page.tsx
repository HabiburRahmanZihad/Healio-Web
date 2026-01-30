"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/providers/CartProvider";
import { Button } from "@/components/ui/button";
import {
    Trash2,
    Plus,
    Minus,
    ShoppingBag,
    ArrowRight,
    ShieldCheck,
    CreditCard,
    Truck,
    PackageSearch
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice, itemCount } = useCart();

    const handleRemove = (id: string, name: string) => {
        removeFromCart(id);
        toast.success(`${name} removed from inventory`, {
            className: "bg-zinc-900 border-red-500/50 text-white",
        });
    };

    if (itemCount === 0) {
        return (
            <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center pt-20">
                {/* Background Atmosphere */}
                <div className="absolute top-0 right-0 size-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10" />
                <div className="absolute bottom-0 left-0 size-[500px] bg-emerald-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full mx-4 p-12 rounded-[3rem] bg-white/[0.02] border border-dashed border-white/10 backdrop-blur-sm text-center space-y-8"
                >
                    <div className="relative inline-flex items-center justify-center p-8 bg-primary/10 rounded-full text-primary">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                        <PackageSearch className="size-16 relative z-10" />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Inventory Empty</h1>
                        <p className="text-gray-500 font-medium">
                            Your pharmaceutical reserve is currently depleted. Explore our archive to replenish your supplies.
                        </p>
                    </div>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 px-8 py-7 text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95">
                        <Link href="/medicines" className="flex items-center gap-3">
                            Open Archive
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden py-32">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 size-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="absolute bottom-0 left-0 size-[500px] bg-emerald-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="max-w-4xl mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-black uppercase tracking-widest"
                    >
                        <ShoppingBag className="size-3.5" />
                        <span>Supply Chain Management</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter uppercase">
                        YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">INVENTORY</span>
                    </h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-16 items-start">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {cart.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="relative flex flex-col sm:flex-row gap-8 p-6 rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 group overflow-hidden"
                                >
                                    {/* Glass Overlay Effects */}
                                    <div className="absolute top-0 right-0 size-32 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

                                    <div className="relative size-32 sm:size-40 rounded-3xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/10 p-2">
                                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                            <Image
                                                src={item.image || "/placeholder-medicine.png"}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between py-2">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                                        <ShieldCheck className="size-3" />
                                                        <span>Verified Reserve</span>
                                                    </div>
                                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                                        Supplied by {item.manufacturer}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemove(item.id, item.name)}
                                                    className="p-3 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-all active:scale-90"
                                                    title="Decommission item"
                                                >
                                                    <Trash2 className="size-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                                            <div className="flex items-center gap-4 bg-white/[0.03] rounded-2xl p-1.5 border border-white/10">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all active:scale-90"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="size-4" />
                                                </button>
                                                <span className="w-8 text-center text-lg font-black text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all active:scale-90"
                                                >
                                                    <Plus className="size-4" />
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Aggregate Cost</p>
                                                <p className="text-3xl font-black text-white">
                                                    ৳{(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="p-10 rounded-[3rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 sticky top-32 space-y-10 shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 size-40 bg-primary/20 blur-[80px] -translate-y-1/2 translate-x-1/2 -z-10" />

                            <div className="space-y-1 pt-2">
                                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Order Summary</h2>
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Transaction Protocol</p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                                        <span>Total Components</span>
                                        <span className="text-white">{itemCount} Units</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                                        <span>Subtotal</span>
                                        <span className="text-white font-black">৳{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                                        <span>Logistics</span>
                                        <span className="text-emerald-500 font-black">Gratis</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 space-y-4">
                                    <div className="flex justify-between items-end">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Final Amount</p>
                                        <p className="text-5xl font-black text-white leading-none">
                                            ৳{totalPrice.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Button asChild className="w-full py-8 text-sm font-black uppercase tracking-[0.2em] rounded-2xl bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/20 group transition-all duration-300 active:scale-[0.98]">
                                    <Link href="/checkout" className="flex items-center justify-center gap-3">
                                        Initialize Checkout
                                        <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>

                                <div className="flex items-center justify-center gap-4 py-2 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                                    <ShieldCheck className="size-4 text-emerald-500" />
                                    <CreditCard className="size-4 text-blue-500" />
                                    <Truck className="size-4 text-primary" />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5 text-center">
                                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                    <ShieldCheck className="size-3" />
                                    Secured by Encrypted Gateway
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
