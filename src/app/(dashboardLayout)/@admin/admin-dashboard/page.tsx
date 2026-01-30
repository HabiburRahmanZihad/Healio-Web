"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Pill, ShoppingCart, BarChart3, TrendingUp, TrendingDown, DollarSign, Activity, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { orderService, Order } from "@/services/order.service";
import { User } from "@/types";

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
        { title: "Total Revenue", value: `$${stats?.revenue.toLocaleString() || "0"}`, trend: "+20.1%", trendUp: true, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Admin Overview</h1>
                    <p className="text-muted-foreground">Comprehensive system analytics and business performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white/5 border-white/10 text-white rounded-xl hover:bg-white/10">Export Report</Button>
                    <Button className="bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20">System Update</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <Card key={i} className="bg-white/5 border-white/10 overflow-hidden relative group hover:border-primary/40 transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.title}</CardTitle>
                            <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl group-hover:rotate-12 transition-transform`}>
                                <stat.icon className="size-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="flex items-center gap-1.5">
                                {stat.trendUp ? <TrendingUp className="size-3 text-emerald-500" /> : <TrendingDown className="size-3 text-red-500" />}
                                <span className={`text-xs font-bold ${stat.trendUp ? "text-emerald-500" : "text-red-500"}`}>
                                    {stat.trend}
                                </span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-white/5 border-white/10 rounded-3xl overflow-hidden">
                    <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl text-white">Revenue Growth</CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">Monthly performance comparison.</p>
                            </div>
                            <Activity className="size-5 text-primary animate-pulse" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 h-[300px] flex items-end justify-between gap-2">
                        {/* Mock Chart */}
                        {[60, 45, 75, 50, 90, 65, 80, 55, 95, 70, 85, 100].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div
                                    className="w-full bg-primary/20 rounded-t-lg transition-all duration-500 group-hover:bg-primary relative"
                                    style={{ height: `${height}%` }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        ${height}k
                                    </div>
                                </div>
                                <span className="text-[10px] text-muted-foreground group-hover:text-white transition-colors">M{i + 1}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden">
                    <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                        <CardTitle className="text-xl text-white">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {[
                                ...recentOrders.map(order => ({
                                    label: `Order ${order.id.slice(-6).toUpperCase()}`,
                                    value: `$${order.totalPrice.toFixed(2)}`,
                                    time: new Date(order.createdAt).toLocaleDateString(),
                                    icon: ShoppingCart,
                                    bg: "bg-purple-500/10",
                                    color: "text-purple-500",
                                    timestamp: new Date(order.createdAt).getTime()
                                })),
                                ...recentUsers.map(user => ({
                                    label: user.name,
                                    value: "New Registration",
                                    time: new Date(user.createdAt || Date.now()).toLocaleDateString(),
                                    icon: Users,
                                    bg: "bg-blue-500/10",
                                    color: "text-blue-500",
                                    timestamp: user.createdAt ? new Date(user.createdAt).getTime() : 0
                                }))
                            ]
                                .sort((a, b) => b.timestamp - a.timestamp)
                                .slice(0, 6)
                                .map((item, i) => (
                                    <div key={i} className="p-6 flex items-start gap-4 hover:bg-white/[0.01] transition-colors group">
                                        <div className={`${item.bg} ${item.color} p-2 rounded-xl shrink-0 group-hover:scale-110 transition-transform`}>
                                            <item.icon className="size-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-white truncate">{item.label}</p>
                                            <p className="text-xs text-muted-foreground">{item.value}</p>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{item.time}</span>
                                    </div>
                                ))}
                            {recentOrders.length === 0 && recentUsers.length === 0 && (
                                <div className="p-12 text-center text-muted-foreground italic">
                                    No recent activity found.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}