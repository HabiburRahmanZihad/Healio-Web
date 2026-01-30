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
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                        <Activity className="size-3 animate-pulse" />
                        <span>Store Status: Synchronized</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                        Merchant <span className="text-primary italic">Overview</span>
                    </h1>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium max-w-xl">
                        Manage your pharmaceutical inventory and track acquisition cycles for <span className="text-white font-bold">{session?.user.name}</span>.
                    </p>
                </div>
                <Button asChild className="h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[11px] px-8 rounded-2xl shadow-[0_15px_40px_rgba(var(--primary-rgb),0.3)] transition-all active:scale-95 group overflow-hidden relative border-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <Link href="/seller-dashboard/medicines/add" className="flex items-center gap-3 relative z-10">
                        <PlusCircle className="size-5" />
                        <span>Register New Asset</span>
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
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
                            <div className="mt-2 flex items-center gap-1.5 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                                <div className="size-1 rounded-full bg-primary" />
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Node Sync: Optimal</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid xl:grid-cols-3 gap-10">
                <Card className="xl:col-span-2 bg-white/[0.03] border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl">
                    <CardHeader className="p-6 md:p-10 pb-4 border-b border-white/5 bg-white/[0.01] flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Active Transmissions</CardTitle>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Incoming orders requiring processing.</p>
                        </div>
                        <Button variant="ghost" asChild className="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary rounded-xl border border-primary/20 transition-all">
                            <Link href="/seller-dashboard/orders" className="flex items-center gap-2 font-black uppercase tracking-tighter text-xs">
                                Management Hub <ArrowRight className="size-3.5" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {recentOrders.length > 0 ? (
                                recentOrders.map((order) => (
                                    <div key={order.id} className="p-6 md:px-10 flex flex-wrap md:flex-nowrap items-center justify-between hover:bg-white/[0.05] transition-all duration-300 group">
                                        <div className="flex items-center gap-6">
                                            <div className="size-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-orange-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-black/40">
                                                <Package className="size-7" />
                                            </div>
                                            <div>
                                                <p className="font-black text-white uppercase tracking-tight text-lg">Order #{order.id?.slice(-8).toUpperCase() || "..."}</p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Pending"}</span>
                                                    <div className="size-1 bg-white/10 rounded-full" />
                                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{order.items?.length || 0} units</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-auto mt-4 md:mt-0 flex items-center justify-between md:flex-col md:items-end gap-3">
                                            <p className="font-black text-2xl text-white tracking-tighter leading-none">৳{order.totalPrice?.toLocaleString() || "0"}</p>
                                            <div className={cn(
                                                "text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border shadow-lg transition-colors",
                                                order.status === "DELIVERED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/5" :
                                                    order.status === "CANCELLED" ? "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-500/5" :
                                                        "bg-sky-500/10 text-sky-400 border-sky-500/20 shadow-sky-500/5"
                                            )}>
                                                {order.status || "Processing"}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-20 text-center space-y-4">
                                    <div className="size-16 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center mx-auto text-gray-700">
                                        <Package className="size-8" />
                                    </div>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No active acquisition logs found.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/[0.03] border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl">
                    <CardHeader className="p-6 md:p-10 pb-4 border-b border-white/5 bg-white/[0.01]">
                        <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Stock Warnings</CardTitle>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Inventory depletion alerts.</p>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {lowStockMedicines.length > 0 ? (
                                lowStockMedicines.map((item, i) => (
                                    <div key={i} className="p-6 px-10 flex items-start gap-5 hover:bg-white/[0.05] transition-all duration-300 group">
                                        <div className={cn(
                                            "p-3 rounded-2xl shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/5 shadow-lg",
                                            item.stock < 5 ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                                        )}>
                                            <Pill className="size-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-black text-white truncate uppercase tracking-tight">{item.name}</p>
                                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{item.stock} Units Remaining</p>
                                        </div>
                                        <div className={cn(
                                            "text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-md border",
                                            item.stock < 5 ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                        )}>
                                            {item.stock < 5 ? 'Critical' : 'Low'}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-20 text-center space-y-4">
                                    <div className="size-16 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center mx-auto text-gray-700">
                                        <Pill className="size-8" />
                                    </div>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Inventory levels are optimal.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

const Activity = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
)
