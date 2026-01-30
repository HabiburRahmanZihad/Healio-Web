"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { orderService, Order } from "@/services/order.service";
import { useWishlist } from "@/providers/WishlistProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Heart, Star, CreditCard, ArrowRight, Package, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <div className="size-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Operational Status: Active</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                    Welcome, <span className="text-primary italic">{session?.user.name}</span>
                </h1>
                <p className="text-sm text-muted-foreground font-medium max-w-2xl">
                    Your pharmaceutical procurement interface is synchronized. Monitor your orders, points, and medical inventory from this central node.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const CardWrapper = stat.title === "Wishlist" ? ({ children }: { children: React.ReactNode }) => <Link href="/dashboard/wishlist">{children}</Link> : React.Fragment;
                    return (
                        <CardWrapper key={i}>
                            <Card className="bg-white/[0.03] border-white/10 overflow-hidden group hover:border-primary/40 transition-all duration-500 cursor-pointer backdrop-blur-md relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.title}</CardTitle>
                                    <div className={`${stat.bg} ${stat.color} p-2 rounded-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white/5 shadow-lg shadow-black/20`}>
                                        <stat.icon className="size-4" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-black text-white tracking-tight">{stat.value}</div>
                                    <div className="mt-2 flex items-center gap-1.5 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                                        <div className="size-1 rounded-full bg-primary" />
                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Real-time Sync</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </CardWrapper>
                    );
                })}
            </div>

            <div className="grid xl:grid-cols-3 gap-8">
                <Card className="xl:col-span-2 bg-white/[0.03] border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl">
                    <CardHeader className="p-8 pb-4 border-b border-white/5 bg-white/[0.01] flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Deployment History</CardTitle>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Your last {recentOrders.length} acquisition cycles.</p>
                        </div>
                        <Button
                            variant="ghost"
                            asChild
                            className="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary rounded-xl border border-primary/20 transition-all active:scale-95"
                        >
                            <Link href="/dashboard/orders" className="flex items-center gap-2 font-black uppercase tracking-tighter text-xs">
                                Access All <ArrowRight className="size-3.5" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {recentOrders.length > 0 ? (
                                recentOrders.map((order) => (
                                    <div key={order.id} className="p-6 md:px-8 flex flex-wrap md:flex-nowrap items-center justify-between hover:bg-white/[0.04] transition-all duration-300 group">
                                        <div className="flex items-center gap-6">
                                            <div className="size-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-black/40">
                                                <Package className="size-7" />
                                            </div>
                                            <div>
                                                <p className="font-black text-white uppercase tracking-tight text-lg">Order #{order.id.slice(-8).toUpperCase()}</p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                    <div className="size-1 bg-white/10 rounded-full" />
                                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{order.items.length} units</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-auto mt-4 md:mt-0 flex items-center justify-between md:flex-col md:items-end gap-3 px-4 md:px-0">
                                            <p className="font-black text-2xl text-white tracking-tighter leading-none">৳{order.totalPrice.toLocaleString()}</p>
                                            <div className={cn(
                                                "text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border shadow-lg transition-colors",
                                                order.status === "DELIVERED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/5" :
                                                    order.status === "CANCELLED" ? "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-500/5" :
                                                        "bg-sky-500/10 text-sky-400 border-sky-500/20 shadow-sky-500/5"
                                            )}>
                                                {order.status}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-20 text-center space-y-4">
                                    <div className="size-16 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center mx-auto text-gray-700">
                                        <ShoppingBag className="size-8" />
                                    </div>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No active acquisition logs found.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-primary/30 to-blue-900/20 border-primary/20 rounded-[2.5rem] overflow-hidden relative group shadow-2xl backdrop-blur-xl border flex flex-col">
                    <div className="absolute -top-12 -right-12 size-48 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/40 transition-all duration-700" />
                    <div className="absolute -bottom-12 -left-12 size-48 bg-blue-600/20 rounded-full blur-[80px] group-hover:bg-blue-600/40 transition-all duration-700" />

                    <CardHeader className="p-10 pb-6 relative">
                        <div className="size-14 bg-white/10 rounded-2xl flex items-center justify-center text-primary border border-white/10 mb-6 shadow-xl shadow-black/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                            <Star className="size-7" />
                        </div>
                        <CardTitle className="text-3xl text-white font-black uppercase tracking-tighter leading-tight">Healio <br /><span className="text-primary italic">Premium</span></CardTitle>
                        <p className="text-sm text-gray-400 font-medium leading-relaxed mt-4">
                            Unlock advanced logistics protocols: zero-cost delivery, prioritized consultation, and exclusive price indexing.
                        </p>
                    </CardHeader>
                    <CardContent className="p-10 pt-0 relative flex-1 flex flex-col">
                        <div className="space-y-5 mb-10 flex-1">
                            {[
                                "10% Deflated Asset Costs",
                                "Zero-Cost Logistics (Free Shipping)",
                                "24/7 Neural Consultation Link"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-4 text-xs font-bold text-white/70 group/item">
                                    <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30 group-hover/item:scale-110 transition-transform">
                                        <CheckCircle2 className="size-3" />
                                    </div>
                                    <span className="uppercase tracking-widest">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full h-16 bg-white text-zinc-950 hover:bg-primary hover:text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl transition-all active:scale-95 group/btn overflow-hidden relative border-none">
                            <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                            <span className="relative z-10">Initiate Upgrade Protocol</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

const CheckCircle2 = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
)
