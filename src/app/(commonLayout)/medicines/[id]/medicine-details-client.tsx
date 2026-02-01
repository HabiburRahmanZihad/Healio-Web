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

    const handleAddToCart = () => {
        if (isGuest) {
            window.location.href = "/login";
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
        <div className="min-h-screen bg-background relative overflow-hidden pb-12">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-primary/10 blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-0 size-[500px] bg-blue-500/5 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2 -z-10" />

            <div className="container mx-auto px-4 pt-20 relative z-10">
                {/* Top Actions */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/medicines"
                        className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                    >
                        <ArrowLeft className="size-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Back to Archive</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500"
                        >
                            <ShieldCheck className="size-3.5" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Authenticated Product</span>
                        </motion.div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 items-start">
                    {/* Left: Interactive Media Viewer */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative group"
                    >
                        <div className="relative aspect-[4/4.5] rounded-[2rem] overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/10 p-3 shadow-2xl transition-all duration-700 group-hover:border-primary/20">
                            <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
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
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-1.5 text-[9px] font-black uppercase tracking-widest bg-primary/80 backdrop-blur-md text-white rounded-full border border-white/10">
                                        {category.name}
                                    </span>
                                </div>
                            )}

                            {/* Stock Indicator Bubble */}
                            <div className="absolute bottom-6 right-6">
                                <div className={cn(
                                    "px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 flex flex-col items-center",
                                    isOutOfStock ? "bg-red-500/20 text-red-500" : "bg-primary/20 text-primary"
                                )}>
                                    <span className="text-[8px] font-black uppercase tracking-widest mb-0.5">Status</span>
                                    <span className="text-xs font-black whitespace-nowrap">
                                        {isOutOfStock ? "Stock Deficit" : "Reserve Stable"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Specs */}
                        <div className="mt-6 grid grid-cols-3 gap-3">
                            {[
                                { icon: Truck, label: "Express", sub: "Delivery" },
                                { icon: RotateCcw, label: "7 Days", sub: "Returns" },
                                { icon: BadgeCheck, label: "Verified", sub: "Quality" }
                            ].map((spec, i) => (
                                <div key={i} className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <spec.icon className="size-4 text-primary mb-1.5" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-white">{spec.label}</span>
                                    <span className="text-[7px] text-gray-500 uppercase">{spec.sub}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Detailed Analysis & Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-8"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-primary">
                                <span className="size-1.5 bg-primary rounded-full animate-ping" />
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Direct Pharmaceutical Supply</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase break-words">
                                {name.split(" ").map((word, i) => (
                                    <span key={i} className={cn(i % 2 !== 0 && "text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400")}>
                                        {word}{" "}
                                    </span>
                                ))}
                            </h1>
                            <div className="flex items-center gap-3 pt-1">
                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-500">
                                    <Package className="size-3" />
                                    {manufacturer}
                                </div>
                                {requiresPrescription && (
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-xs font-bold text-yellow-600">
                                        <FileText className="size-3" />
                                        <span>MD Required</span>
                                    </div>
                                )}
                                {totalReviews && totalReviews > 0 ? (
                                    <button
                                        onClick={() => {
                                            setActiveTab("reviews");
                                            const element = document.getElementById("reviews-section");
                                            element?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-lg text-xs font-bold text-primary hover:bg-primary/20 transition-colors"
                                    >
                                        <Star className="size-3 fill-current" />
                                        <span>{averageRating?.toFixed(1)}</span>
                                        <span className="text-[9px] text-primary/60">({totalReviews})</span>
                                    </button>
                                ) : null}
                            </div>
                        </div>

                        <div className="p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm space-y-5">
                            <div className="flex items-end justify-between">
                                <div className="space-y-0.5">
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Acquisition Cost</p>
                                    <p className="text-3xl font-black text-white leading-none">
                                        ৳{price.toFixed(2)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Stock Level</p>
                                    <p className={cn(
                                        "text-lg font-bold",
                                        isOutOfStock ? "text-red-500" : "text-primary"
                                    )}>
                                        {stock} Units
                                    </p>
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 leading-relaxed font-medium pt-3 border-t border-white/5 line-clamp-4">
                                {description}
                            </p>

                            <div className="grid grid-cols-2 gap-3 pt-1">
                                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                                    <Layers className="size-3.5 text-primary mb-1.5" />
                                    <p className="text-[7px] text-gray-500 uppercase font-bold tracking-widest">Classification</p>
                                    <p className="text-[10px] font-bold text-white truncate">{category?.name || "General"}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                                    <ShieldCheck className="size-3.5 text-primary mb-1.5" />
                                    <p className="text-[7px] text-gray-500 uppercase font-bold tracking-widest">Authenticity</p>
                                    <p className="text-[10px] font-bold text-white truncate">100% Certified</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Action Interface */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {!isManagement ? (
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={handleAddToCart}
                                    disabled={isOutOfStock}
                                    className={cn(
                                        "flex-[2] h-14 px-8 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl",
                                        isOutOfStock
                                            ? "bg-zinc-800 text-gray-600 cursor-not-allowed border border-white/5"
                                            : "bg-primary text-white hover:bg-primary/90 shadow-primary/10"
                                    )}
                                >
                                    {isOutOfStock ? (
                                        "Protocol Halted - No Stock"
                                    ) : isGuest ? (
                                        <>
                                            <LogIn className="size-4" />
                                            <span>Login to Add</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="size-4" />
                                            <span>Add to Inventory</span>
                                        </>
                                    )}
                                </motion.button>
                            ) : (
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                                    <Info className="size-4 shrink-0" />
                                    <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">
                                        Management Restricted: Inventory and system oversight protocols only. Purchasing disabled for {userRole} accounts.
                                    </p>
                                </div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleToggleWishlist}
                                className={cn(
                                    "h-14 w-14 rounded-xl border transition-all flex items-center justify-center",
                                    isInWishlist(id)
                                        ? "bg-pink-500/10 border-pink-500/30 text-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.1)]"
                                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                )}
                            >
                                <Heart className={cn("size-5 transition-all", isInWishlist(id) && "fill-current scale-110")} />
                            </motion.button>
                        </div>

                        {/* Professional Disclaimer */}
                        <div className="pt-4 border-t border-white/5 flex items-start gap-2">
                            <Info className="size-3.5 text-gray-600 mt-0.5 shrink-0" />
                            <p className="text-[9px] text-gray-600 font-medium leading-relaxed uppercase tracking-tighter">
                                Disclaimer: Pharmaceutical products should be used as directed by a healthcare professional. Ensure you have the required documentation for restricted formulas.
                            </p>
                        </div>
                    </motion.div>
                </div>
                <div id="reviews-section" className="mt-16 sm:mt-24 space-y-12">
                    {/* Tab Navigation */}
                    <div className="flex items-center gap-8 border-b border-white/5 pb-4">
                        <button
                            onClick={() => setActiveTab("details")}
                            className={cn(
                                "text-[10px] font-black uppercase tracking-[0.3em] transition-all relative pb-4",
                                activeTab === "details" ? "text-primary" : "text-gray-600 hover:text-gray-400"
                            )}
                        >
                            Technical Specifications
                            {activeTab === "details" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
                        </button>
                        <button
                            onClick={() => setActiveTab("reviews")}
                            className={cn(
                                "text-[10px] font-black uppercase tracking-[0.3em] transition-all relative pb-4",
                                activeTab === "reviews" ? "text-primary" : "text-gray-600 hover:text-gray-400"
                            )}
                        >
                            User Manifests ({totalReviews})
                            {activeTab === "reviews" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        <div className="lg:col-span-8">
                            {activeTab === "details" ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                            {description}
                                        </p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                                                <Factory className="size-3.5" /> Manufacturer Protocol
                                            </div>
                                            <p className="text-sm font-black text-white">{manufacturer}</p>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                                                <Layers className="size-3.5" /> Classification Grid
                                            </div>
                                            <p className="text-sm font-black text-white">{category?.name || "General Specification"}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <ReviewList reviews={reviews || []} averageRating={averageRating} totalReviews={totalReviews} />
                            )}
                        </div>

                        {/* Side Section: Review Form or Info */}
                        <div className="lg:col-span-4 space-y-6">
                            {isCustomer ? (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 px-2">
                                        <div className="h-0.5 w-6 bg-primary/40 rounded-full" />
                                        <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Emit Signal</h3>
                                    </div>
                                    <ReviewForm medicineId={id} onSuccess={() => router.refresh()} />
                                </div>
                            ) : isManagement ? (
                                <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 space-y-4">
                                    <ShieldCheck className="size-8 text-indigo-500" />
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Oversight Mode</p>
                                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest leading-relaxed">
                                        Feedback submission is locked for administrative and supply chain accounts to maintain network integrity.
                                    </p>
                                </div>
                            ) : (
                                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6 text-center">
                                    <div className="size-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto text-gray-400">
                                        <LogIn className="size-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs font-black text-white uppercase tracking-widest">Identity Required</p>
                                        <p className="text-[9px] text-gray-500 font-medium uppercase tracking-widest leading-relaxed">
                                            Authenticated session required to emit operational feedback.
                                        </p>
                                    </div>
                                    <Button asChild variant="outline" className="w-full rounded-xl border-white/10 hover:bg-white/5">
                                        <Link href="/login">Initialize Authentication</Link>
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
