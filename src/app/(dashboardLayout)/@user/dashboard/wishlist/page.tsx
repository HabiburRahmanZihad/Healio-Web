"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/providers/WishlistProvider";
import { useCart } from "@/providers/CartProvider";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Package, Sparkles, Plus, ArrowRight, Activity, Zap, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = (medicine: any) => {
        addToCart(medicine);
        toast.success(`${medicine.name} added to cart`, {
            style: {
                background: "rgba(24, 24, 27, 0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#fff",
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                        <Heart className="size-3 fill-primary" />
                        Personal Archive
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                            My <span className="text-primary italic">Wishlist</span>
                        </h1>
                        <p className="text-sm text-muted-foreground font-mono tracking-widest uppercase">
                            Archived Assets & Preferred Procurement Registry
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-md">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Assets</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-white">{wishlist.length}</span>
                            <span className="text-[10px] font-bold text-primary uppercase">Nodes</span>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-white/10" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Status</span>
                        <span className="text-xs font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                            <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            Live Sync
                        </span>
                    </div>
                </div>
            </div>

            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {wishlist.map((medicine, idx) => (
                            <motion.div
                                key={medicine.id}
                                layout
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group relative"
                            >
                                {/* Glow Effect */}
                                <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-transparent to-primary/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative h-full flex flex-col rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 group-hover:translate-y-[-8px] group-hover:border-primary/20 shadow-2xl">
                                    {/* Asset Reveal Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={medicine.image || "/placeholder-medicine.png"}
                                            alt={medicine.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60" />

                                        {/* Status Overlays */}
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            {medicine.category && (
                                                <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black text-white uppercase tracking-[0.2em] rounded-lg">
                                                    {medicine.category.name}
                                                </span>
                                            )}
                                        </div>

                                        <div className="absolute top-4 right-4 focus-visible:outline-none">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeFromWishlist(medicine.id)}
                                                className="size-10 rounded-xl bg-rose-500/10 hover:bg-rose-500 backdrop-blur-md border border-rose-500/20 text-rose-500 hover:text-white transition-all duration-300"
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>

                                        {/* Price Vector */}
                                        <div className="absolute bottom-4 left-6">
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-0.5">Index Valuation</p>
                                            <p className="text-2xl font-black text-white tracking-tighter">৳{medicine.price.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    {/* Content Mesh */}
                                    <div className="p-8 flex flex-col flex-1 gap-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                                                <Activity className="size-3 text-primary" />
                                                Archive Ref: {medicine.id.slice(-8).toUpperCase()}
                                            </div>
                                            <Link href={`/medicines/${medicine.id}`} className="block">
                                                <h3 className="text-2xl font-black text-white tracking-tighter uppercase group-hover:text-primary transition-colors leading-tight">
                                                    {medicine.name}
                                                </h3>
                                            </Link>
                                            <p className="text-xs text-muted-foreground line-clamp-2 font-medium leading-relaxed">
                                                {medicine.description}
                                            </p>
                                        </div>

                                        <div className="mt-auto space-y-4">
                                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5 pb-3">
                                                <span>Availability Status</span>
                                                <span className={cn(
                                                    medicine.stock > 0 ? "text-emerald-500" : "text-rose-500"
                                                )}>
                                                    {medicine.stock > 0 ? `In Stock [${medicine.stock} Units]` : "Deployment Offline"}
                                                </span>
                                            </div>

                                            <Button
                                                onClick={() => handleAddToCart(medicine)}
                                                disabled={medicine.stock === 0}
                                                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_10px_30px_rgba(var(--primary-rgb),0.2)] group-hover:scale-[1.02] transition-all relative overflow-hidden group/btn"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:animate-shimmer" />
                                                <ShoppingCart className="size-4 mr-3 group-hover:rotate-12 transition-transform" />
                                                {medicine.stock === 0 ? "OUT_OF_NODES" : "Provision to Cart"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-32 rounded-[3.5rem] bg-zinc-900/40 backdrop-blur-xl border-4 border-dashed border-white/5 flex flex-col items-center text-center gap-10"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                        <div className="relative size-32 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-gray-500 overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Package className="size-16 group-hover:scale-110 transition-transform duration-500" />
                            <Zap className="absolute top-4 right-4 size-4 text-primary animate-pulse" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Inventory Archives Empty</h3>
                        <p className="text-sm text-gray-500 font-medium max-w-sm tracking-wide leading-relaxed">
                            No preferred procurement items currently registered in your personal identity nexus. Begin asset acquisition to populate this archive.
                        </p>
                    </div>

                    <Button asChild className="h-16 px-12 rounded-[2rem] bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 font-black uppercase tracking-[0.3em] text-[10px] transition-all group/shop">
                        <Link href="/medicines" className="flex items-center gap-4">
                            Initialize Procurement
                            <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </Button>
                </motion.div>
            )}
        </div>
    );
}

const ActivityIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
)
