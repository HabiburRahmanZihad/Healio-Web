"use client";

import { authClient } from "@/lib/auth-client";
import { medicineService } from "@/services/medicine.service";
import { orderService, Order } from "@/services/order.service";
import { Medicine } from "@/types/medicine.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, ShoppingCart, BarChart3, PlusCircle, ArrowRight, Package, TrendingUp, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function SellerDashboard() {
    const { data: session } = authClient.useSession();
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [medRes, orderRes] = await Promise.all([
                medicineService.getSellerMedicines(),
                orderService.getSellerOrders()
            ]);

            if (!medRes.error && medRes.data) setMedicines(medRes.data);
            if (!orderRes.error && orderRes.data) setOrders(orderRes.data);

            setIsLoading(false);
        };

        fetchData();
    }, []);

    const activeOrdersCount = orders.filter(o => o.status !== "DELIVERED" && o.status !== "CANCELLED").length;
    const totalSales = orders
        .filter(o => o.status === "DELIVERED")
        .reduce((sum, o) => sum + o.totalPrice, 0);

    const stats = [
        { title: "My Medicines", value: medicines.length.toString(), icon: Pill, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Active Orders", value: activeOrdersCount.toString(), icon: ShoppingCart, color: "text-orange-500", bg: "bg-orange-500/10" },
        { title: "Total Sales", value: `৳${totalSales.toLocaleString()}`, icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
        { title: "Inventory Status", value: medicines.filter(m => m.stock < 10).length.toString() + " Low", icon: BarChart3, color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

    const lowStockMedicines = medicines
        .filter(m => m.stock < 15)
        .sort((a, b) => a.stock - b.stock)
        .slice(0, 5);

    const recentOrders = orders.slice(0, 5);

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
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Store Overview: <span className="text-primary">{session?.user.name}</span>
                    </h1>
                    <p className="text-muted-foreground">Manage your pharmacy inventory and track incoming orders.</p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20 h-12 px-6">
                    <Link href="/seller-dashboard/medicines/add" className="flex items-center gap-2">
                        <PlusCircle className="size-5" />
                        Add New Medicine
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="bg-white/5 border-white/10 overflow-hidden group hover:border-primary/50 transition-all">
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
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-white/5 border-white/10 rounded-3xl overflow-hidden">
                    <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl text-white">Incoming Orders</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">Orders requiring your attention.</p>
                        </div>
                        <Button variant="ghost" asChild className="text-primary hover:text-primary hover:bg-primary/10">
                            <Link href="/seller-dashboard/orders" className="flex items-center gap-2">
                                Manage Orders <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {recentOrders.length > 0 ? (
                                recentOrders.map((order) => (
                                    <div key={order.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-105 transition-transform">
                                                <Package className="size-6" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">Order #{order.id?.slice(-8).toUpperCase() || "UNKNOWN"}</p>
                                                <p className="text-xs text-muted-foreground">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Unknown date"} • {order.items?.length || 0} items</p>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-2">
                                            <p className="font-bold text-white">৳{order.totalPrice?.toFixed(2) || "0.00"}</p>
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border",
                                                order.status === "DELIVERED" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                    order.status === "CANCELLED" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                                        "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                            )}>{order.status || "UNKNOWN"}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center text-muted-foreground">
                                    No incoming orders yet.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden">
                    <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                        <CardTitle className="text-xl text-white">Stock Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {lowStockMedicines.length > 0 ? (
                                lowStockMedicines.map((item, i) => (
                                    <div key={i} className="p-6 flex items-start gap-4 hover:bg-white/[0.01] transition-colors group">
                                        <div className={`p-2 rounded-xl shrink-0 group-hover:scale-110 transition-transform ${item.stock < 5 ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                            <Pill className="size-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-white truncate">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.stock} left in stock</p>
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase ${item.stock < 5 ? 'text-red-500' : 'text-orange-500'}`}>
                                            {item.stock < 5 ? 'Critical' : 'Low'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center text-muted-foreground">
                                    Inventory is healthy.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
