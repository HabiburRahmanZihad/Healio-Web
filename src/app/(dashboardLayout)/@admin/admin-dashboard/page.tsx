"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    Pill,
    ShoppingCart,
    TrendingUp,
    TrendingDown,
    Activity,
    Loader2,
    Download,
    CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
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

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export default function AdminDashboard() {
    const { data: session } = authClient.useSession();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [recentUsers, setRecentUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

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

    const handleGenerateReport = async () => {
        setIsGenerating(true);
        const toastId = toast.loading("Accessing system intelligence...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success("Intelligence Report Compiled", {
            id: toastId,
            description: "HEALIO_SYSTEM_INDEX_v1.0.4 is ready.",
            icon: <Download className="size-4 text-emerald-500" />
        });
        setIsGenerating(false);
    };

    const handleSyncData = async () => {
        setIsSyncing(true);
        const toastId = toast.loading("Syncing nexus nodes...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success("Nexus Fully Synchronized", {
            id: toastId,
            description: "Fiscal data and identities are now consistent.",
            icon: <CheckCircle2 className="size-4 text-primary" />
        });
        setIsSyncing(false);
    };

    const statCards = [
        { title: "Total Revenue", value: `৳${stats?.revenue.toLocaleString() || "0"}`, trend: "+20.1%", trendUp: true, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10", tag: "REVENUE_SYNC" },
        { title: "Registered Users", value: stats?.users.toString() || "0", trend: "+180.1%", trendUp: true, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", tag: "USER_UPLINK" },
        { title: "Total Orders", value: stats?.orders.toString() || "0", trend: "+19%", trendUp: true, icon: ShoppingCart, color: "text-purple-500", bg: "bg-purple-500/10", tag: "ORDER_VOLUME" },
        { title: "Asset Inventory", value: stats?.medicines.toString() || "0", trend: "-4%", trendUp: false, icon: Pill, color: "text-orange-500", bg: "bg-orange-500/10", tag: "INVENTORY_STABLE" },
    ];

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="size-8 animate-spin text-primary opacity-50" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-70">Establishing Command Nexus...</span>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-10 pb-12"
        >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8 relative">
                <div className="absolute -bottom-[1px] left-0 w-32 h-[1px] bg-primary" />
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[9px] font-black uppercase tracking-[0.2em]">
                        <Activity className="size-3 animate-pulse" />
                        <span>System Core: Operational</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                        Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 italic">Center</span>
                    </h1>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.1em] max-w-xl opacity-70">
                        Aggregated system intelligence and high-level behavioral analytics for the <span className="text-white">Healio Nexus</span>.
                    </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                    <Button
                        variant="outline"
                        onClick={handleGenerateReport}
                        disabled={isGenerating || isSyncing}
                        className="h-10 border-white/10 bg-white/[0.02] text-white font-black uppercase tracking-widest text-[9px] px-5 rounded-xl hover:bg-white/5 hover:border-primary/30 transition-all backdrop-blur-md disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 className="size-3 animate-spin mr-2" /> : <Download className="size-3 mr-2" />}
                        {isGenerating ? "Compiling..." : "Generate Report"}
                    </Button>
                    <Button
                        onClick={handleSyncData}
                        disabled={isSyncing || isGenerating}
                        className="h-10 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[9px] px-5 rounded-xl shadow-[0_4px_20px_rgba(var(--primary-rgb),0.2)] transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isSyncing ? <Activity className="size-3 animate-pulse mr-2" /> : <Activity className="size-3 mr-2" />}
                        {isSyncing ? "Synchronizing..." : "Sync Data Node"}
                    </Button>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <motion.div key={i} whileHover={{ y: -4 }}>
                        <Card className="bg-white/[0.02] border-white/5 overflow-hidden group hover:border-primary/20 transition-all duration-300 backdrop-blur-md relative rounded-[1.5rem]">
                            <div className="p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.title}</span>
                                        <span className="text-[8px] font-bold text-primary/40 uppercase tracking-widest mt-0.5">{stat.tag}</span>
                                    </div>
                                    <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl group-hover:scale-105 transition-transform duration-300 border border-white/5`}>
                                        <stat.icon className="size-4" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-2xl font-black text-white tracking-tight leading-none">{stat.value}</div>
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase",
                                            stat.trendUp ? "text-emerald-400 bg-emerald-400/5" : "text-rose-400 bg-rose-400/5"
                                        )}>
                                            {stat.trendUp ? <TrendingUp className="size-2" /> : <TrendingDown className="size-2" />}
                                            <span>{stat.trend}</span>
                                        </div>
                                        <div className="size-1 rounded-full bg-white/5" />
                                        <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">Delta</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid xl:grid-cols-3 gap-8">
                <motion.div variants={itemVariants} className="xl:col-span-2">
                    <Card className="bg-white/[0.02] border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl relative">
                        <CardHeader className="p-8 pb-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <div className="size-1.5 bg-primary rounded-full animate-pulse" />
                                        <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Revenue Trajectory</CardTitle>
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Protocol Sync: Real-time fiscal analysis across nodes.</p>
                                </div>
                                <div className="flex items-center gap-3 px-3 py-1.5 bg-zinc-950/40 border border-white/5 rounded-xl">
                                    <Activity className="size-3 text-primary" />
                                    <span className="text-[9px] font-bold text-white uppercase tracking-widest">Live Index</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 h-[350px] flex items-end justify-between gap-3 md:gap-4">
                            {[60, 45, 75, 50, 90, 65, 80, 55, 95, 70, 85, 100].map((height, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-help">
                                    <div className="w-full flex items-end justify-center relative h-full">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${height}%` }}
                                            transition={{ duration: 1, delay: 0.5 + i * 0.05, ease: "easeOut" }}
                                            className="w-full bg-gradient-to-t from-primary/5 to-primary/30 rounded-xl border border-primary/10 group-hover:from-primary/20 group-hover:to-primary/50 transition-all duration-300"
                                        />
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-950 border border-white/10 text-primary text-[8px] font-black px-2 py-1 rounded-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 backdrop-blur-md shadow-2xl z-10 whitespace-nowrap">
                                            ৳{height}K
                                        </div>
                                    </div>
                                    <span className="text-[8px] font-black text-gray-800 tracking-widest">T_{i + 1}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="bg-white/[0.02] border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl h-full flex flex-col">
                        <CardHeader className="p-8 pb-4 border-b border-white/5">
                            <div className="space-y-1">
                                <CardTitle className="text-lg font-black text-white uppercase tracking-tight">Nexus Event Log</CardTitle>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest opacity-60">Global activity monitoring.</p>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 flex-1 relative overflow-hidden">
                            <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-3">
                                {[
                                    ...recentOrders.map(order => ({
                                        label: `Protocol: ${order.id.slice(-4).toUpperCase()}`,
                                        value: `৳${order.totalPrice.toFixed(0)}`,
                                        time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                        icon: ShoppingCart,
                                        bg: "bg-purple-500/10",
                                        color: "text-purple-400",
                                        timestamp: new Date(order.createdAt).getTime()
                                    })),
                                    ...recentUsers.map(user => ({
                                        label: `Identity: ${user.name.split(' ')[0]}`,
                                        value: "GRANTED",
                                        time: user.createdAt ? new Date(user.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recently",
                                        icon: Users,
                                        bg: "bg-blue-500/10",
                                        color: "text-blue-400",
                                        timestamp: user.createdAt ? new Date(user.createdAt).getTime() : 0
                                    }))
                                ]
                                    .sort((a, b) => b.timestamp - a.timestamp)
                                    .slice(0, 8)
                                    .map((item, i) => (
                                        <div key={i} className="mb-2 p-4 flex items-start gap-4 rounded-2xl bg-white/[0.01] border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-colors duration-300 group">
                                            <div className={`${item.bg} ${item.color} p-2.5 rounded-xl border border-white/5 group-hover:scale-105 transition-transform duration-300`}>
                                                <item.icon className="size-3.5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[11px] font-black text-white truncate uppercase tracking-tight">{item.label}</p>
                                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-0.5">{item.value}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 shrink-0">
                                                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{item.time}</span>
                                                <div className="size-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
