"use client";

import { useState } from "react";
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
    BadgeCheck,
    LogIn,
    Star,
    User,
    Factory
} from "lucide-react";
import { motion } from "framer-motion";
import { ReviewList } from "@/components/modules/reviews/review-list";
import { ReviewForm } from "@/components/modules/reviews/review-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface MedicineDetailsClientProps {
    medicine: Medicine;
}

export function MedicineDetailsClient({ medicine }: MedicineDetailsClientProps) {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const userRole = (session?.user as any)?.role;
    const isManagement = userRole === "SELLER" || userRole === "ADMIN";
    const isCustomer = userRole === "CUSTOMER";
    const isGuest = !session?.user;
    const { id, name, description, price, stock, image, manufacturer, category, requiresPrescription, reviews, averageRating, totalReviews } = medicine;
    const isOutOfStock = stock === 0;

    const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");

    const hasReviewed = session?.user?.id ? (reviews || []).some(r => r.userId === session.user.id) : false;

    const handleAddToCart = () => {
        if (isGuest) {
            const callbackURL = encodeURIComponent(window.location.pathname);
            window.location.href = `/login?callbackURL=${callbackURL}`;
            return;
        }

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
        <div className="min-h-screen bg-[#050505] relative overflow-hidden pb-24 selection:bg-primary/30 selection:text-primary">
            {/* Nexus Background Elements */}
            <div className="absolute top-0 inset-x-0 h-[600px] pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-[120px]" />
                <div className="absolute top-[-10%] left-[-10%] size-[600px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
                <div className="absolute bottom-0 right-[-10%] size-[500px] bg-primary/5 rounded-full blur-[80px]" />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container mx-auto px-4 pt-24 relative z-10">
                {/* Header Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
                >
                    <Link
                        href="/medicines"
                        className="group w-fit flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 text-gray-400 hover:text-white transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                    >
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Exit to Archive</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-emerald-400">
                            <ShieldCheck className="size-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Protocol Authenticated</span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Visual Asset (7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-12 xl:col-span-7 relative"
                    >
                        <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-[2.5rem] overflow-hidden group">
                            {/* Inner Glow Container */}
                            <div className="absolute inset-0 p-[2px] rounded-[2.5rem] bg-gradient-to-br from-white/20 via-white/5 to-transparent">
                                <div className="relative w-full h-full rounded-[2.4rem] overflow-hidden bg-zinc-900 shadow-2xl">
                                    <Image
                                        src={image || "/placeholder-medicine.png"}
                                        alt={name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        priority
                                    />

                                    {/* Advanced Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--primary),0.2),transparent_50%)]" />

                                    {/* Dynamic Data Tags */}
                                    <div className="absolute top-8 left-8 flex flex-wrap gap-3">
                                        {category && (
                                            <motion.div
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="px-5 py-2 rounded-full bg-primary/90 backdrop-blur-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20"
                                            >
                                                {category.name}
                                            </motion.div>
                                        )}
                                        {requiresPrescription && (
                                            <motion.div
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="px-5 py-2 rounded-full bg-amber-500/90 backdrop-blur-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-amber-500/20"
                                            >
                                                MD Authorization Required
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Asset Status Terminal */}
                                    <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "size-2 rounded-full animate-pulse",
                                                    isOutOfStock ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                                                )} />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Asset Integrity</span>
                                            </div>
                                            <h2 className="text-4xl font-black text-white tracking-tighter uppercase line-clamp-1">{name}</h2>
                                        </div>

                                        <div className="hidden sm:flex flex-col items-end gap-1">
                                            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">System Status</span>
                                            <span className={cn(
                                                "px-4 py-1 rounded-lg text-[10px] font-black uppercase border backdrop-blur-md",
                                                isOutOfStock ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-primary/10 border-primary/30 text-primary"
                                            )}>
                                                {isOutOfStock ? "DEPLETED" : "OPERATIONAL"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Corner Accents */}
                            <div className="absolute top-0 right-0 p-8">
                                <div className="size-16 border-t-2 border-r-2 border-primary/30 rounded-tr-[2rem]" />
                            </div>
                            <div className="absolute bottom-0 left-0 p-8">
                                <div className="size-16 border-b-2 border-l-2 border-primary/30 rounded-bl-[2rem]" />
                            </div>
                        </div>

                        {/* Feature Nodes */}
                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Truck, label: "Logistics", sub: "Priority Rapid" },
                                { icon: RotateCcw, label: "Redemption", sub: "07-Cycle Window" },
                                { icon: BadgeCheck, label: "Verification", sub: "Quantum-Node Scan" },
                                { icon: ShieldCheck, label: "Security", sub: "Encrypted Chain" }
                            ].map((spec, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + (i * 0.1) }}
                                    className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors group/node"
                                >
                                    <spec.icon className="size-5 text-primary mb-3 group-hover/node:scale-110 transition-transform" />
                                    <p className="text-[9px] font-black text-white uppercase tracking-widest mb-1">{spec.label}</p>
                                    <p className="text-[8px] text-gray-500 uppercase font-medium">{spec.sub}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Execution Terminal (5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-12 xl:col-span-5 space-y-8"
                    >
                        {/* Information Header */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-[2px] w-8 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Product Manifest v4.2</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Factory className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Origin</p>
                                        <p className="text-sm font-bold text-white">{manufacturer}</p>
                                    </div>
                                </div>
                                {totalReviews && totalReviews > 0 && (
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="size-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                            <Star className="size-5 text-amber-500 fill-current" />
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Network Consensus</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-bold text-white">{averageRating?.toFixed(1)}</p>
                                                <span className="text-[10px] text-white/30">({totalReviews} units feedback)</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Acquisition Interface */}
                        <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-2xl overflow-hidden group">
                            {/* Price Hex Glow */}
                            <div className="absolute -top-24 -right-24 size-48 bg-primary/20 rounded-full blur-[60px]" />

                            <div className="relative space-y-8">
                                <div className="flex items-end justify-between border-b border-white/5 pb-8">
                                    <div className="space-y-2">
                                        <span className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">
                                            Acquisition Cost
                                        </span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xl font-bold text-primary">৳</span>
                                            <span className="text-5xl font-black text-white tracking-tighter">
                                                {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Inventory Depth</span>
                                        <p className={cn(
                                            "text-2xl font-black tracking-tighter",
                                            isOutOfStock ? "text-red-500" : "text-white"
                                        )}>
                                            {stock} <span className="text-xs text-white/40 font-bold uppercase ml-1">Units</span>
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-400 leading-relaxed font-medium line-clamp-4 italic">
                                    " {description} "
                                </p>

                                {/* Action Matrix */}
                                <div className="flex items-stretch gap-4">
                                    {!isManagement ? (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleAddToCart}
                                            disabled={isOutOfStock}
                                            className={cn(
                                                "flex-[4] h-16 rounded-2xl relative overflow-hidden flex items-center justify-center gap-3 transition-all",
                                                isOutOfStock
                                                    ? "bg-zinc-800 text-zinc-600 border border-white/5 cursor-not-allowed"
                                                    : "bg-primary text-white shadow-[0_20px_40px_-15px_rgba(var(--primary),0.4)]"
                                            )}
                                        >
                                            {/* Button Glow Effect */}
                                            {!isOutOfStock && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_2s_infinite]" />}

                                            {isOutOfStock ? (
                                                <span className="text-xs font-black uppercase tracking-widest">Protocol Halted</span>
                                            ) : isGuest ? (
                                                <>
                                                    <LogIn className="size-5" />
                                                    <span className="text-xs font-black uppercase tracking-widest">Authorize & Acquire</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="size-5" />
                                                    <span className="text-xs font-black uppercase tracking-widest">Initiate Acquisition</span>
                                                </>
                                            )}
                                        </motion.button>
                                    ) : (
                                        <div className="flex-[4] p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center gap-4">
                                            <ShieldCheck className="size-5 shrink-0" />
                                            <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                                                Restricted Operator Mode: Purchasing disabled for {userRole} status.
                                            </p>
                                        </div>
                                    )}

                                    <motion.button
                                        whileHover={{ scale: 1.1, backgroundColor: "rgba(236, 72, 153, 0.1)" }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleToggleWishlist}
                                        className={cn(
                                            "size-16 rounded-2xl border transition-all flex items-center justify-center shrink-0",
                                            isInWishlist(id)
                                                ? "bg-pink-500 border-pink-500 text-white shadow-[0_10px_25px_-5px_rgba(236,72,153,0.4)]"
                                                : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                                        )}
                                    >
                                        <Heart className={cn("size-6 transition-all", isInWishlist(id) && "fill-current scale-110")} />
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Security Disclaimer */}
                        <div className="p-6 rounded-3xl bg-zinc-900 border border-white/5 flex items-start gap-4">
                            <div className="size-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                <Info className="size-4 text-gray-500" />
                            </div>
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed uppercase tracking-tight">
                                <span className="text-white font-black">Operator Notice:</span> All pharmaceutical extractions require verified credentials. misuse or unauthorized distribution will trigger system lockdown. Consult primary medical node before application.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Technical Node Tabs */}
                <div id="reviews-section" className="mt-24 space-y-16">
                    <div className="flex items-center justify-center">
                        <div className="inline-flex p-1.5 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                            <button
                                onClick={() => setActiveTab("details")}
                                className={cn(
                                    "px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all",
                                    activeTab === "details" ? "bg-primary text-white shadow-lg" : "text-gray-500 hover:text-white"
                                )}
                            >
                                Tech Specs
                            </button>
                            <button
                                onClick={() => setActiveTab("reviews")}
                                className={cn(
                                    "px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all",
                                    activeTab === "reviews" ? "bg-primary text-white shadow-lg" : "text-gray-500 hover:text-white"
                                )}
                            >
                                Network Feedback ({totalReviews})
                            </button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-8">
                            {activeTab === "details" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-10"
                                >
                                    <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-10 opacity-10">
                                            <FileText className="size-32 text-primary" />
                                        </div>
                                        <div className="relative prose prose-invert max-w-none">
                                            <p className="text-lg text-gray-300 leading-relaxed font-medium">
                                                {description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 space-y-4">
                                            <div className="flex items-center gap-3 text-primary">
                                                <Factory className="size-5" />
                                                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Origin Node</span>
                                            </div>
                                            <p className="text-xl font-bold text-white">{manufacturer}</p>
                                        </div>
                                        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 space-y-4">
                                            <div className="flex items-center gap-3 text-blue-400">
                                                <Layers className="size-5" />
                                                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Matrix Grid</span>
                                            </div>
                                            <p className="text-xl font-bold text-white">{category?.name || "General Node"}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <ReviewList reviews={reviews || []} averageRating={averageRating} totalReviews={totalReviews} />
                            )}
                        </div>

                        {/* Signaling Section */}
                        <div className="lg:col-span-4 sticky top-24">
                            {isCustomer ? (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4 px-4">
                                        <div className="size-2 rounded-full bg-primary" />
                                        <h3 className="text-xs font-black text-white uppercase tracking-[0.4em]">Signal Emission</h3>
                                    </div>
                                    {hasReviewed ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-10 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/20 text-center space-y-6"
                                        >
                                            <div className="size-20 rounded-[2rem] bg-emerald-500/20 flex items-center justify-center mx-auto">
                                                <BadgeCheck className="size-10 text-emerald-500" />
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-xs font-black text-white uppercase tracking-widest">Signal Transmitted</p>
                                                <p className="text-[10px] text-emerald-500/50 font-medium uppercase tracking-widest leading-relaxed px-4">
                                                    Your frequency has been harmonized with the manifest. Multi-signal emissions are prevented by network security.
                                                </p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="p-2 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                                            <ReviewForm medicineId={id} onSuccess={() => router.refresh()} />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 text-center space-y-8">
                                    <div className="size-24 rounded-[2.5rem] bg-white/5 flex items-center justify-center mx-auto text-gray-600">
                                        <User className="size-10" />
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-sm font-black text-white uppercase tracking-[0.2em]">Unknown Identity</p>
                                        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em] leading-relaxed">
                                            Operator authorization required to access signaling matrix and emit manifest feedback.
                                        </p>
                                    </div>
                                    <Button asChild className="w-full h-16 rounded-2xl bg-primary hover:shadow-[0_0_30px_rgba(var(--primary),0.3)] font-black uppercase text-xs tracking-widest">
                                        <Link href="/login">Authorize Session</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


