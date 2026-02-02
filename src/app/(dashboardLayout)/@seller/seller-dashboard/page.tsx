"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { medicineService } from "@/services/medicine.service";
import { orderService, Order } from "@/services/order.service";
import { Medicine } from "@/types/medicine.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, ShoppingCart, BarChart3, PlusCircle, ArrowRight, Package, TrendingUp, Loader2, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
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
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[9px] font-black uppercase tracking-[0.2em]">
                        <Activity className="size-3 animate-pulse" />
                        <span>Store Status: Synchronized</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                        Merchant <span className="text-primary italic">Overview</span>
                    </h1>
                    <p className="text-xs text-muted-foreground font-medium max-w-xl opacity-70">
                        Manage your pharmaceutical inventory and track acquisition cycles for <span className="text-white font-bold">{session?.user.name}</span>.
                    </p>
                </div>
                <Button asChild className="h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] px-6 rounded-xl shadow-[0_4px_20px_rgba(var(--primary-rgb),0.2)] transition-all active:scale-95 group overflow-hidden relative border-none shrink-0">
                    <Link href="/seller-dashboard/medicines/add" className="flex items-center gap-2 relative z-10">
                        <PlusCircle className="size-4" />
                        <span>Register New Asset</span>
                    </Link>
                </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div key={i} whileHover={{ y: -4 }}>
                        <Card className="bg-white/[0.02] border-white/5 overflow-hidden group hover:border-primary/30 transition-colors duration-300 cursor-pointer backdrop-blur-md relative rounded-[1.5rem]">
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CardHeader className="flex flex-row items-center justify-between pb-3">
                                <CardTitle className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.title}</CardTitle>
                                <div className={`${stat.bg} ${stat.color} p-2 rounded-xl group-hover:scale-105 transition-all duration-300 border border-white/5`}>
                                    <stat.icon className="size-4" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-black text-white tracking-tight mb-2">{stat.value}</div>
                                <div className="mt-2 flex items-center gap-1.5 opacity-30 group-hover:opacity-60 transition-opacity">
                                    <div className="size-1 rounded-full bg-primary" />
                                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">Node Sync: Optimal</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid xl:grid-cols-3 gap-8 md:gap-10">
                <motion.div variants={itemVariants} className="xl:col-span-2">
                    <Card className="bg-white/[0.02] border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl">
                        <CardHeader className="p-6 md:p-8 pb-4 border-b border-white/5 bg-white/[0.01] flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-lg md:text-xl font-black text-white uppercase tracking-tight">Active Transmissions</CardTitle>
                                <p className="text-[9px] font-medium text-gray-500 uppercase tracking-widest">Incoming orders requiring processing.</p>
                            </div>
                            <Button variant="ghost" asChild className="h-8 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary rounded-lg border border-primary/20 transition-all font-black uppercase tracking-tighter text-[10px]">
                                <Link href="/seller-dashboard/orders" className="flex items-center gap-2">
                                    Management Hub <ArrowRight className="size-3" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-white/5">
                                {recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <div key={order.id} className="p-5 md:px-8 flex flex-wrap md:flex-nowrap items-center justify-between hover:bg-white/[0.03] transition-colors duration-300 group">
                                            <div className="flex items-center gap-5">
                                                <div className="size-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-orange-400 group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-black/20">
                                                    <Package className="size-5" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-white uppercase tracking-tight text-sm">Order #{order.id?.slice(-6).toUpperCase() || "..."}</p>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Pending"}</span>
                                                        <div className="size-1 bg-white/10 rounded-full" />
                                                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest">{order.items?.length || 0} units</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-auto mt-3 md:mt-0 flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0">
                                                <p className="font-black text-xl text-white tracking-tighter leading-none">৳{order.totalPrice?.toLocaleString() || "0"}</p>
                                                <div className={cn(
                                                    "text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-full border",
                                                    order.status === "DELIVERED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                        order.status === "CANCELLED" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                                                            "bg-sky-500/10 text-sky-400 border-sky-500/20"
                                                )}>
                                                    {order.status || "Processing"}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-16 text-center space-y-4">
                                        <div className="size-12 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center mx-auto text-gray-800 opacity-20">
                                            <Package className="size-6" />
                                        </div>
                                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">No active acquisition logs found.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="bg-white/[0.02] border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl h-full flex flex-col">
                        <CardHeader className="p-8 pb-4 border-b border-white/5">
                            <CardTitle className="text-lg font-black text-white uppercase tracking-tight">Stock Warnings</CardTitle>
                            <p className="text-[9px] font-medium text-gray-500 uppercase tracking-widest">Inventory depletion alerts.</p>
                        </CardHeader>
                        <CardContent className="p-0 flex-1 relative overflow-hidden">
                            <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-3">
                                {lowStockMedicines.length > 0 ? (
                                    lowStockMedicines.map((item, i) => (
                                        <div key={i} className="mb-2 p-4 flex items-start gap-4 hover:bg-white/[0.03] rounded-2xl transition-all duration-300 group">
                                            <div className={cn(
                                                "p-2.5 rounded-xl shrink-0 group-hover:scale-105 transition-all duration-500 border border-white/5",
                                                item.stock < 5 ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                                            )}>
                                                <Pill className="size-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-black text-white truncate uppercase tracking-tight">{item.name}</p>
                                                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{item.stock} Units Left</p>
                                            </div>
                                            <div className={cn(
                                                "text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border mt-1 shrink-0",
                                                item.stock < 5 ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            )}>
                                                {item.stock < 5 ? 'Critical' : 'Low'}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-16 text-center space-y-4">
                                        <div className="size-12 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center mx-auto text-gray-800 opacity-20">
                                            <Pill className="size-6" />
                                        </div>
                                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Levels optimal.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
