"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Pill, ShoppingCart, BarChart3, TrendingUp, TrendingDown, Activity, Loader2 } from "lucide-react";
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
        { title: "Total Revenue", value: `৳${stats?.revenue.toLocaleString() || "0"}`, trend: "+20.1%", trendUp: true, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { title: "Registered Users", value: stats?.users.toString() || "0", trend: "+180.1%", trendUp: true, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Total Orders", value: stats?.orders.toString() || "0", trend: "+19%", trendUp: true, icon: ShoppingCart, color: "text-purple-500", bg: "bg-purple-500/10" },
        { title: "Medicine Inventory", value: stats?.medicines.toString() || "0", trend: "-4%", trendUp: false, icon: Pill, color: "text-orange-500", bg: "bg-orange-500/10" },
    ];

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                        <Activity className="size-3 animate-pulse" />
                        <span>System Core: Operational</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                        Command <span className="text-primary italic">Center</span>
                    </h1>
                    <p className="text-sm text-muted-foreground font-medium max-w-xl">
                        Aggregated system intelligence and high-level behavioral analytics for the Healio pharmaceutical network.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="h-12 border-white/10 bg-white/5 text-white font-black uppercase tracking-widest text-[10px] px-6 rounded-xl hover:bg-white/10 transition-all">
                        Generate Intelligence
                    </Button>
                    <Button className="h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] px-6 rounded-xl shadow-[0_10px_30px_rgba(var(--primary-rgb),0.3)] transition-all active:scale-95">
                        Sync Protocol
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <Card key={i} className="bg-white/[0.03] border-white/10 overflow-hidden group hover:border-primary/40 transition-all duration-500 backdrop-blur-md relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <CardTitle className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.title}</CardTitle>
                            <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white/5 shadow-lg`}>
                                <stat.icon className="size-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-white tracking-tight mb-2">{stat.value}</div>
                            <div className="flex items-center gap-2">
                                <div className={cn(
                                    "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase",
                                    stat.trendUp ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                )}>
                                    {stat.trendUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                                    <span>{stat.trend}</span>
                                </div>
                                <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">vs prev period</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid xl:grid-cols-3 gap-10">
                <Card className="xl:col-span-2 bg-white/[0.03] border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl relative">
                    <CardHeader className="p-10 pb-4 border-b border-white/5 bg-white/[0.01]">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-2xl font-black text-white uppercase tracking-tight">Revenue Trajectory</CardTitle>
                                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Real-time fiscal monitoring across all nodes.</p>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/5 rounded-lg">
                                <Activity className="size-4 text-primary animate-pulse" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Index</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10 h-[400px] flex items-end justify-between gap-3">
                        {/* Mock Chart */}
                        {[60, 45, 75, 50, 90, 65, 80, 55, 95, 70, 85, 100].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                <div
                                    className="w-full bg-primary/10 rounded-xl transition-all duration-700 group-hover:bg-primary/40 relative border border-primary/5 hover:border-primary/20 shadow-inner group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]"
                                    style={{ height: `${height}%` }}
                                >
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                                        ৳{height}K
                                    </div>
                                </div>
                                <span className="text-[9px] font-black text-gray-600 group-hover:text-primary transition-colors tracking-widest">Q{i + 1}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="bg-white/[0.03] border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl">
                    <CardHeader className="p-10 pb-4 border-b border-white/5 bg-white/[0.01]">
                        <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Event Log</CardTitle>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Recent node activity and updates.</p>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto custom-scrollbar">
                            {[
                                ...recentOrders.map(order => ({
                                    label: `Sync Order ${order.id.slice(-6).toUpperCase()}`,
                                    value: `৳${order.totalPrice.toFixed(2)}`,
                                    time: new Date(order.createdAt).toLocaleDateString(),
                                    icon: ShoppingCart,
                                    bg: "bg-purple-500/10",
                                    color: "text-purple-400",
                                    timestamp: new Date(order.createdAt).getTime()
                                })),
                                ...recentUsers.map(user => ({
                                    label: user.name,
                                    value: "Neural Node Created",
                                    time: new Date(user.createdAt || Date.now()).toLocaleDateString(),
                                    icon: Users,
                                    bg: "bg-blue-500/10",
                                    color: "text-blue-400",
                                    timestamp: user.createdAt ? new Date(user.createdAt).getTime() : 0
                                }))
                            ]
                                .sort((a, b) => b.timestamp - a.timestamp)
                                .slice(0, 10)
                                .map((item, i) => (
                                    <div key={i} className="p-6 px-10 flex items-start gap-5 hover:bg-white/[0.05] transition-all duration-300 group">
                                        <div className={`${item.bg} ${item.color} p-2.5 rounded-2xl shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/5`}>
                                            <item.icon className="size-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-black text-white truncate uppercase tracking-tight">{item.label}</p>
                                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{item.value}</p>
                                        </div>
                                        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mt-1">{item.time}</span>
                                    </div>
                                ))}
                            {recentOrders.length === 0 && recentUsers.length === 0 && (
                                <div className="p-20 text-center space-y-4">
                                    <div className="size-16 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center mx-auto text-gray-700">
                                        <Activity className="size-8" />
                                    </div>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No active event logs found.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
