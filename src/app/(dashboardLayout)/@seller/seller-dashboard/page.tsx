"use client";

import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, ShoppingCart, BarChart3, PlusCircle, ArrowRight, Package, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SellerDashboard() {
    const { data: session } = authClient.useSession();

    const stats = [
        { title: "My Medicines", value: "24", icon: Pill, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Active Orders", value: "8", icon: ShoppingCart, color: "text-orange-500", bg: "bg-orange-500/10" },
        { title: "Total Sales", value: "$4,240", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
        { title: "Store Rating", value: "4.8", icon: BarChart3, color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

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
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-105 transition-transform">
                                            <Package className="size-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">Order #ORD-5521{i}</p>
                                            <p className="text-xs text-muted-foreground">Today • 3 items</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-2">
                                        <p className="font-bold text-white">$89.50</p>
                                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">Processing</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden">
                    <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                        <CardTitle className="text-xl text-white">Stock Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {[
                                { name: "Paracetamol 500mg", stock: 5, status: "Critical" },
                                { name: "Amoxicillin Caps", stock: 12, status: "Low" },
                                { name: "Vitamin C Syrup", stock: 8, status: "Low" },
                                { name: "Ibuprofen 400mg", stock: 3, status: "Critical" },
                            ].map((item, i) => (
                                <div key={i} className="p-6 flex items-start gap-4 hover:bg-white/[0.01] transition-colors group">
                                    <div className={`p-2 rounded-xl shrink-0 group-hover:scale-110 transition-transform ${item.status === 'Critical' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                        <Pill className="size-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-white truncate">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.stock} left in stock</p>
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase ${item.status === 'Critical' ? 'text-red-500' : 'text-orange-500'}`}>{item.status}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
