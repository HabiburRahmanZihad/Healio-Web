"use client";

import Image from "next/image";
import Link from "next/link";
import { Medicine } from "@/types/medicine.type";
import { useCart } from "@/providers/CartProvider";
import { useWishlist } from "@/providers/WishlistProvider";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    Info,
    ArrowLeft,
    ShoppingCart,
    Heart,
    ShieldCheck,
    Package,
    Layers,
    FileText,
    Truck,
    RotateCcw,
    BadgeCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MedicineDetailsClientProps {
    medicine: Medicine;
}

export function MedicineDetailsClient({ medicine }: MedicineDetailsClientProps) {
    const { data: session } = authClient.useSession();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const isSeller = (session?.user as any)?.role === "SELLER";
    const { id, name, description, price, stock, image, manufacturer, category, requiresPrescription } = medicine;
    const isOutOfStock = stock === 0;

    const handleAddToCart = () => {
        addToCart(medicine);
        toast.success(`${name} added to archive`, {
            className: "bg-zinc-900 border-primary/50 text-white",
        });
    };

    const handleToggleWishlist = () => {
        toggleWishlist(medicine);
        if (isInWishlist(id)) {
            toast.success(`${name} removed from interests`);
        } else {
            toast.success(`${name} added to interests`, {
                className: "bg-zinc-900 border-pink-500/50 text-white",
            });
        }
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pb-20">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 size-[600px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 -z-10" />

            <div className="container mx-auto px-4 pt-32 relative z-10">
                {/* Top Actions */}
                <div className="flex items-center justify-between mb-12">
                    <Link
                        href="/medicines"
                        className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                    >
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Back to Archive</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500"
                        >
                            <ShieldCheck className="size-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Authenticated Product</span>
                        </motion.div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Interactive Media Viewer */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative group"
                    >
                        <div className="relative aspect-[4/4.5] rounded-[3rem] overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/10 p-4 shadow-2xl transition-all duration-700 group-hover:border-primary/30">
                            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                                <Image
                                    src={image || "/placeholder-medicine.png"}
                                    alt={name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    priority
                                />
                                {/* Glass Overlay on Image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Category Badge */}
                            {category && (
                                <div className="absolute top-8 left-8">
                                    <span className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] bg-primary/80 backdrop-blur-xl text-white rounded-full border border-white/10">
                                        {category.name}
                                    </span>
                                </div>
                            )}

                            {/* Stock Indicator Bubble */}
                            <div className="absolute bottom-8 right-8">
                                <div className={cn(
                                    "px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 flex flex-col items-center",
                                    isOutOfStock ? "bg-red-500/20 text-red-500" : "bg-primary/20 text-primary"
                                )}>
                                    <span className="text-[10px] font-black uppercase tracking-widest mb-1">Status</span>
                                    <span className="text-sm font-black whitespace-nowrap">
                                        {isOutOfStock ? "Stock Deficit" : "Reserve Stable"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Specs */}
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            {[
                                { icon: Truck, label: "Express", sub: "Delivery" },
                                { icon: RotateCcw, label: "7 Days", sub: "Returns" },
                                { icon: BadgeCheck, label: "Verified", sub: "Quality" }
                            ].map((spec, i) => (
                                <div key={i} className="flex flex-col items-center p-4 rounded-3xl bg-white/[0.02] border border-white/5">
                                    <spec.icon className="size-5 text-primary mb-2" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white">{spec.label}</span>
                                    <span className="text-[9px] text-gray-500 uppercase">{spec.sub}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Detailed Analysis & Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-10"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-primary">
                                <span className="size-2 bg-primary rounded-full animate-ping" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Direct Pharmaceutical Supply</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase break-words">
                                {name.split(" ").map((word, i) => (
                                    <span key={i} className={cn(i % 2 !== 0 && "text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400")}>
                                        {word}{" "}
                                    </span>
                                ))}
                            </h1>
                            <div className="flex items-center gap-4 pt-2">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400">
                                    <Package className="size-3.5" />
                                    {manufacturer}
                                </div>
                                {requiresPrescription && (
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-xs font-bold text-yellow-500">
                                        <FileText className="size-3.5" />
                                        <span>MD Required</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm space-y-6">
                            <div className="flex items-end justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Acquisition Cost</p>
                                    <p className="text-5xl font-black text-white">
                                        ৳{price.toFixed(2)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Stock Level</p>
                                    <p className={cn(
                                        "text-xl font-bold",
                                        isOutOfStock ? "text-red-500" : "text-primary"
                                    )}>
                                        {stock} Units
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-400 leading-relaxed font-medium pt-4 border-t border-white/5">
                                {description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                                    <Layers className="size-4 text-primary mb-2" />
                                    <p className="text-[8px] text-gray-500 uppercase font-bold tracking-widest">Classification</p>
                                    <p className="text-xs font-bold text-white truncate">{category?.name || "General"}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                                    <ShieldCheck className="size-4 text-primary mb-2" />
                                    <p className="text-[8px] text-gray-500 uppercase font-bold tracking-widest">Authenticity</p>
                                    <p className="text-xs font-bold text-white truncate">100% Certified</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Action Interface */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            {!isSeller ? (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    disabled={isOutOfStock}
                                    className={cn(
                                        "flex-[2] py-6 px-10 rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-4 transition-all shadow-2xl",
                                        isOutOfStock
                                            ? "bg-zinc-800 text-gray-500 cursor-not-allowed border border-white/5"
                                            : "bg-primary text-white hover:bg-primary/90 shadow-primary/20"
                                    )}
                                >
                                    {isOutOfStock ? (
                                        "Protocol Halted - No Stock"
                                    ) : (
                                        <>
                                            <ShoppingCart className="size-5" />
                                            <span>Add to Inventory</span>
                                        </>
                                    )}
                                </motion.button>
                            ) : (
                                <div className="flex items-center gap-4 p-6 rounded-[2rem] bg-primary/10 border border-primary/20 text-primary">
                                    <Info className="size-6 shrink-0" />
                                    <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">
                                        Supplier Restricted: Inventory management only available for designated customers.
                                    </p>
                                </div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleToggleWishlist}
                                className={cn(
                                    "flex-1 p-6 rounded-[2rem] border transition-all flex items-center justify-center gap-3",
                                    isInWishlist(id)
                                        ? "bg-pink-500/10 border-pink-500/30 text-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.1)]"
                                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                )}
                            >
                                <Heart className={cn("size-6 transition-all", isInWishlist(id) && "fill-current scale-110")} />
                                <span className="sm:hidden text-xs font-black uppercase tracking-widest">Interest</span>
                            </motion.button>
                        </div>

                        {/* Professional Disclaimer */}
                        <div className="pt-6 border-t border-white/5 flex items-start gap-3">
                            <Info className="size-4 text-gray-600 mt-1 shrink-0" />
                            <p className="text-[10px] text-gray-600 font-medium leading-relaxed uppercase tracking-tighter">
                                Disclaimer: Pharmaceutical products should be used as directed by a healthcare professional. Ensure you have the required documentation for restricted formulas.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
