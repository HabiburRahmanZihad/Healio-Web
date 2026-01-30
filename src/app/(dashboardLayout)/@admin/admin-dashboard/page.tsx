"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Pill, ShoppingCart, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { orderService, Order } from "@/services/order.service";
import { User } from "@/types";
import { cn } from "@/lib/utils";

interface DashboardStats {
    users: number;
    medicines: number;
    orders: number;
    revenue: number;
}

export default function AdminDashboard() {
    const { data: session } = authClient.useSession();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [recentUsers, setRecentUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const [statsRes, ordersRes, usersRes] = await Promise.all([
                    userService.getAdminStats(),
                    orderService.getSellerOrders(),
                    userService.getAllUsers()
                ]);

                if (!statsRes.error && statsRes.data) {
                    setStats(statsRes.data);
                }
                if (!ordersRes.error && ordersRes.data) {
                    setRecentOrders(ordersRes.data.slice(0, 5));
                }
                if (!usersRes.error && usersRes.data) {
                    setRecentUsers(usersRes.data.slice(0, 5));
                }
            } catch (error) {
                console.error("Dashboard error:", error);
            }
            setIsLoading(false);
        };
        fetchDashboardData();
    }, []);

    const statCards = [
        { title: "Total Revenue", value: `৳${stats?.revenue.toLocaleString() || "0"}`, trend: "+20.1%", trendUp: true, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10", tag: "REVENUE_SYNC" },
        { title: "Registered Users", value: stats?.users.toString() || "0", trend: "+180.1%", trendUp: true, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", tag: "USER_UPLINK" },
        { title: "Total Orders", value: stats?.orders.toString() || "0", trend: "+19%", trendUp: true, icon: ShoppingCart, color: "text-purple-500", bg: "bg-purple-500/10", tag: "ORDER_VOLUME" },
        { title: "Asset Inventory", value: stats?.medicines.toString() || "0", trend: "-4%", trendUp: false, icon: Pill, color: "text-orange-500", bg: "bg-orange-500/10", tag: "INVENTORY_STABLE" },
    ];

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="relative">
                    <div className="size-16 rounded-full border-t-2 border-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Activity className="size-6 text-primary/50" />
                    </div>
                </div>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">Initializing Command Console...</span>
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8 relative">
                <div className="absolute -bottom-[1px] left-0 w-32 h-[1px] bg-primary" />
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[9px] font-black uppercase tracking-[0.2em]">
                        <Activity className="size-3 animate-pulse" />
                        <span>System Core: Operational</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                        Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 italic">Center</span>
                    </h1>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.1em] max-w-xl">
                        Aggregated system intelligence and high-level behavioral analytics for the <span className="text-white">Healio Nexus</span>.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="h-12 border-white/5 bg-white/[0.02] text-white font-black uppercase tracking-widest text-[9px] px-6 rounded-2xl hover:bg-white/5 hover:border-primary/30 transition-all backdrop-blur-md">
                        Generate Report
                    </Button>
                    <Button className="h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[9px] px-6 rounded-2xl shadow-[0_10px_30px_rgba(var(--primary-rgb),0.3)] transition-all active:scale-95">
                        Sync Data Node
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <div key={i}>
                        <Card className="bg-white/[0.02] border-white/5 overflow-hidden group hover:border-primary/20 transition-all duration-500 backdrop-blur-xl relative rounded-[2rem]">
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.title}</span>
                                        <span className="text-[8px] font-bold text-primary/50 uppercase tracking-widest mt-0.5">{stat.tag}</span>
                                    </div>
                                    <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl group-hover:scale-110 transition-all duration-500 border border-white/5 shadow-2x`}>
                                        <stat.icon className="size-5" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-3xl font-black text-white tracking-tight leading-none">{stat.value}</div>
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase",
                                            stat.trendUp ? "text-emerald-400" : "text-rose-400"
                                        )}>
                                            {stat.trendUp ? <TrendingUp className="size-2.5" /> : <TrendingDown className="size-2.5" />}
                                            <span>{stat.trend}</span>
                                        </div>
                                        <div className="size-1 rounded-full bg-white/10" />
                                        <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">Delta</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 overflow-hidden">
                                    <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-infinite-scroll" />
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            <div className="grid xl:grid-cols-3 gap-10">
                <div className="xl:col-span-2">
                    <Card className="bg-white/[0.02] border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-md shadow-2xl relative border-l border-t border-white/10">
                        <CardHeader className="p-10 pb-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 bg-primary rounded-full animate-ping" />
                                        <CardTitle className="text-2xl font-black text-white uppercase tracking-tight">Revenue Trajectory</CardTitle>
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Protocol Sync: Real-time fiscal analysis across all nodes.</p>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-2 bg-zinc-950/50 border border-white/10 rounded-2xl backdrop-blur-sm">
                                    <Activity className="size-4 text-primary animate-pulse" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Active Links</span>
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Index</span>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-10 pt-0 h-[400px] flex items-end justify-between gap-4">
                            {/* Visual Enhanced Chart */}
                            {[60, 45, 75, 50, 90, 65, 80, 55, 95, 70, 85, 100].map((height, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-help">
                                    <div className="w-full flex items-end justify-center relative h-full">
                                        <div
                                            style={{ height: `${height}%` }}
                                            className="w-full bg-gradient-to-t from-primary/5 to-primary/40 rounded-2xl relative border border-primary/20 group-hover:from-primary/20 group-hover:to-primary/60 transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary-rgb),0.05)]"
                                        >
                                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[2px] h-4 bg-white/20 rounded-full" />
                                        </div>
                                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-zinc-950 border border-primary/30 text-primary text-[9px] font-black px-3 py-1.5 rounded-xl opacity-0 scale-90 group-hover:opacity-100 group-hover:translate-y-2 group-hover:scale-100 transition-all duration-300 backdrop-blur-md shadow-2xl z-10 whitespace-nowrap">
                                            SYNC_VAL: ৳{height}K
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-black text-gray-700 group-hover:text-primary transition-colors tracking-widest">T_{i + 1}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="bg-white/[0.02] border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-md shadow-2xl border-r border-b border-white/10 h-full flex flex-col">
                        <CardHeader className="p-10 pb-6 border-b border-white/5">
                            <div className="space-y-2">
                                <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Nexus Event Log</CardTitle>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global activity monitoring across all system nodes.</p>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 flex-1 relative overflow-hidden">
                            <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-2">
                                {[
                                    ...recentOrders.map(order => ({
                                        label: `Protocol Update: ${order.id.slice(-6).toUpperCase()}`,
                                        value: `Value: ৳${order.totalPrice.toFixed(2)}`,
                                        time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                        icon: ShoppingCart,
                                        bg: "bg-purple-500/10",
                                        color: "text-purple-400",
                                        timestamp: new Date(order.createdAt).getTime()
                                    })),
                                    ...recentUsers.map(user => ({
                                        label: `Identity Link: ${user.name.split(' ')[0]}`,
                                        value: "Status: ACCESS_GRANTED",
                                        time: user.createdAt ? new Date(user.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recently",
                                        icon: Users,
                                        bg: "bg-blue-500/10",
                                        color: "text-blue-400",
                                        timestamp: user.createdAt ? new Date(user.createdAt).getTime() : 0
                                    }))
                                ]
                                    .sort((a, b) => b.timestamp - a.timestamp)
                                    .slice(0, 10)
                                    .map((item, i) => (
                                        <div key={i} className="m-2 p-5 flex items-start gap-4 rounded-3xl bg-white/[0.01] border border-transparent hover:border-white/5 hover:bg-white/[0.03] transition-all duration-500 group">
                                            <div className={`${item.bg} ${item.color} p-3 rounded-2xl shrink-0 group-hover:scale-110 transition-all duration-500 border border-white/5 shadow-lg`}>
                                                <item.icon className="size-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-black text-white truncate uppercase tracking-tight">{item.label}</p>
                                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-0.5">{item.value}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">{item.time}</span>
                                                <div className="size-1 rounded-full bg-primary animate-pulse" />
                                            </div>
                                        </div>
                                    ))}
                                {recentOrders.length === 0 && recentUsers.length === 0 && (
                                    <div className="p-20 text-center space-y-6">
                                        <div className="relative size-20 mx-auto">
                                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                                            <div className="relative size-20 bg-zinc-950 border border-white/10 rounded-full flex items-center justify-center text-gray-800">
                                                <Activity className="size-10 opacity-20" />
                                            </div>
                                        </div>
                                        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">No active data links detected within the nexus.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
