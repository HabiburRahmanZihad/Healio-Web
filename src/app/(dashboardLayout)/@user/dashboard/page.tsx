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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    Welcome back, <span className="text-primary">{session?.user.name}</span>!
                </h1>
                <p className="text-muted-foreground">Here's what's happening with your account today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const CardWrapper = stat.title === "Wishlist" ? ({ children }: { children: React.ReactNode }) => <Link href="/dashboard/wishlist">{children}</Link> : React.Fragment;
                    return (
                        <CardWrapper key={i}>
                            <Card className="bg-white/5 border-white/10 overflow-hidden group hover:border-primary/50 transition-all cursor-pointer">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.title}</CardTitle>
                                    <div className={`${stat.bg} ${stat.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                                        <stat.icon className="size-4" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                </CardContent>
                            </Card>
                        </CardWrapper>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-white/5 border-white/10 rounded-3xl overflow-hidden">
                    <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl text-white">Recent Orders</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">Your last {recentOrders.length} purchases.</p>
                        </div>
                        <Button variant="ghost" asChild className="text-primary hover:text-primary hover:bg-primary/10">
                            <Link href="/dashboard/orders" className="flex items-center gap-2">
                                View All <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {recentOrders.length > 0 ? (
                                recentOrders.map((order) => (
                                    <div key={order.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                                                <Package className="size-6" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">Order #{order.id.slice(-8).toUpperCase()}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-2">
                                            <p className="font-bold text-white">৳{order.totalPrice.toLocaleString()}</p>
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border",
                                                order.status === "DELIVERED" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                    order.status === "CANCELLED" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                                        "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                            )}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center text-muted-foreground">
                                    No orders found.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-primary/20 to-pink-600/10 border-primary/20 rounded-3xl overflow-hidden relative group">
                    <div className="absolute -top-12 -right-12 size-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
                    <CardHeader className="p-8">
                        <CardTitle className="text-2xl text-white font-bold mb-4">Healio Premium</CardTitle>
                        <p className="text-muted-foreground leading-relaxed">
                            Get exclusive discounts, free shipping, and early access to new medicines with our premium membership.
                        </p>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-sm text-white/80">
                                <CheckCircle2 className="size-5 text-primary" />
                                10% Off on All Medicines
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white/80">
                                <CheckCircle2 className="size-5 text-primary" />
                                Unlimited Free Shipping
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white/80">
                                <CheckCircle2 className="size-5 text-primary" />
                                24/7 Digital Consultation
                            </li>
                        </ul>
                        <Button className="w-full h-14 bg-white text-primary hover:bg-gray-100 font-bold text-lg rounded-2xl shadow-xl transition-all active:scale-95">
                            Upgrade Now
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
