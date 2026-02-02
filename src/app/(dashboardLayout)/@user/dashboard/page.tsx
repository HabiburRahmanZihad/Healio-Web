"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { orderService, Order } from "@/services/order.service";
import { useWishlist } from "@/providers/WishlistProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ShoppingBag,
    Heart,
    Star,
    CreditCard,
    ArrowRight,
    Package,
    Loader2,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export default function UserDashboard() {
    const { data: session } = authClient.useSession();
    const { wishlistCount } = useWishlist();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!session) return;
            setIsLoading(true);
            const { data, error } = await orderService.getMyOrders();
            if (!error && data) {
                setOrders(data);
            }
            setIsLoading(false);
        };

        fetchOrders();
    }, [session]);

    const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const recentOrders = orders.slice(0, 3);

    const stats = [
        { title: "Total Orders", value: orders.length.toString(), icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Loyalty Points", value: "0", icon: Star, color: "text-yellow-500", bg: "bg-yellow-500/10" },
        { title: "Wishlist", value: wishlistCount.toString(), icon: Heart, color: "text-pink-500", bg: "bg-pink-500/10" },
        { title: "Total Spent", value: `৳${totalSpent.toLocaleString()}`, icon: CreditCard, color: "text-green-500", bg: "bg-green-500/10" },
    ];

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary opacity-50" />
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-10"
        >
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="size-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-80">Operational Status: Active</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                    Welcome, <span className="text-primary italic">{session?.user.name}</span>
                </h1>
                <p className="text-xs text-muted-foreground font-medium max-w-xl opacity-70">
                    Your pharmaceutical procurement interface is synchronized. Monitor your orders, points, and medical inventory from this central node.
                </p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, i) => {
                    const CardWrapper = stat.title === "Wishlist" ? ({ children }: { children: React.ReactNode }) => <Link href="/dashboard/wishlist">{children}</Link> : React.Fragment;
                    return (
                        <CardWrapper key={i}>
                            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                                <Card className="bg-white/[0.02] border-white/5 overflow-hidden group hover:border-primary/30 transition-colors duration-300 cursor-pointer backdrop-blur-md relative">
                                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.title}</CardTitle>
                                        <div className={`${stat.bg} ${stat.color} p-2 rounded-lg group-hover:scale-105 transition-transform duration-300 border border-white/5`}>
                                            <stat.icon className="size-3.5" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-black text-white tracking-tight">{stat.value}</div>
                                        <div className="mt-1 flex items-center gap-1.5 opacity-30 group-hover:opacity-60 transition-opacity">
                                            <div className="size-1 rounded-full bg-primary" />
                                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">Sync Active</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </CardWrapper>
                    );
                })}
            </motion.div>

            <div className="grid xl:grid-cols-3 gap-6 md:gap-8">
                <motion.div variants={itemVariants} className="xl:col-span-2">
                    <Card className="h-full bg-white/[0.02] border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-2xl">
                        <CardHeader className="p-6 md:p-8 pb-4 border-b border-white/5 bg-white/[0.01] flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-lg font-black text-white uppercase tracking-tight">Deployment History</CardTitle>
                                <p className="text-[9px] font-medium text-gray-500 uppercase tracking-widest">Your last {recentOrders.length} acquisition cycles.</p>
                            </div>
                            <Button
                                variant="ghost"
                                asChild
                                className="h-8 px-3 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary rounded-lg border border-primary/20 transition-all active:scale-95"
                            >
                                <Link href="/dashboard/orders" className="flex items-center gap-2 font-black uppercase tracking-tighter text-[10px]">
                                    Log Archive <ArrowRight className="size-3" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-white/5">
                                {recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <div key={order.id} className="p-5 md:px-8 flex flex-wrap md:flex-nowrap items-center justify-between hover:bg-white/[0.03] transition-colors duration-300 group">
                                            <div className="flex items-center gap-5">
                                                <div className="size-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-500 shadow-xl shadow-black/20">
                                                    <Package className="size-5" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-white uppercase tracking-tight text-sm">Order #{order.id.slice(-6).toUpperCase()}</p>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                        <div className="size-1 bg-white/10 rounded-full" />
                                                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest">{order.items.length} units</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-auto mt-3 md:mt-0 flex items-center justify-between md:flex-col md:items-end gap-2 px-2 md:px-0">
                                                <p className="font-black text-xl text-white tracking-tighter leading-none">৳{order.totalPrice.toLocaleString()}</p>
                                                <div className={cn(
                                                    "text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border transition-colors",
                                                    order.status === "DELIVERED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                        order.status === "CANCELLED" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                                                            "bg-sky-500/10 text-sky-400 border-sky-500/20"
                                                )}>
                                                    {order.status}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-16 text-center space-y-4">
                                        <div className="size-12 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center mx-auto text-gray-800">
                                            <ShoppingBag className="size-6" />
                                        </div>
                                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">No active acquisition logs found.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="h-full bg-gradient-to-br from-primary/20 to-blue-950/10 border-primary/10 rounded-[2rem] overflow-hidden relative group shadow-2xl backdrop-blur-xl border flex flex-col">
                        <div className="absolute -top-12 -right-12 size-40 bg-primary/10 rounded-full blur-[60px] group-hover:bg-primary/20 transition-all duration-700" />
                        <CardHeader className="p-8 pb-4 relative">
                            <div className="size-12 bg-white/10 rounded-xl flex items-center justify-center text-primary border border-white/10 mb-4 shadow-xl shadow-black/10 group-hover:scale-110 transition-transform duration-500">
                                <Star className="size-6" />
                            </div>
                            <CardTitle className="text-2xl text-white font-black uppercase tracking-tighter leading-tight">Healio <span className="text-primary italic">Premium</span></CardTitle>
                            <p className="text-xs text-gray-400 font-medium leading-relaxed mt-3 opacity-80">
                                Unlock advanced logistics protocols: zero-cost delivery and exclusive price indexing.
                            </p>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 relative flex-1 flex flex-col justify-between">
                            <div className="space-y-4 mb-8">
                                {[
                                    "10% Deflated Asset Costs",
                                    "Zero-Cost Logistics",
                                    "Neural Consultation Link"
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 text-[9px] font-bold text-white/60">
                                        <div className="size-4 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                                            <CheckCircle2 className="size-3.5" />
                                        </div>
                                        <span className="uppercase tracking-widest">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full h-12 bg-white text-zinc-950 hover:bg-primary hover:text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl shadow-xl transition-all active:scale-95 group/btn overflow-hidden relative border-none">
                                <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                                <span className="relative z-10">Initiate Upgrade Protocol</span>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
