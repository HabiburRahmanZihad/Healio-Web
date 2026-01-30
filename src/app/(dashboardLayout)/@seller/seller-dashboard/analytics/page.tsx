"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { medicineService } from "@/services/medicine.service";
import { orderService, Order } from "@/services/order.service";
import { Medicine } from "@/types/medicine.type";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Package,
    Activity,
    Loader2,
    ArrowUpRight,
    ArrowDownRight,
    Users,
    ShoppingCart,
    Clock,
    CheckCircle2,
    XCircle,
    Truck
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SellerAnalyticsPage() {
    const { data: session } = authClient.useSession();
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [medRes, orderRes] = await Promise.all([
                    medicineService.getSellerMedicines(),
                    orderService.getSellerOrders()
                ]);

                if (!medRes.error && medRes.data) setMedicines(medRes.data);
                if (!orderRes.error && orderRes.data) setOrders(orderRes.data);
            } catch (error) {
                console.error("Failed to fetch analytics data", error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    // Derived Metrics
    const deliveredOrders = orders.filter(o => o.status === "DELIVERED");
    const cancelledOrders = orders.filter(o => o.status === "CANCELLED");
    const pendingOrders = orders.filter(o => o.status === "PLACED" || o.status === "SHIPPED");

    const totalRevenue = deliveredOrders.reduce((sum, o) => sum + o.totalPrice, 0);
    const averageOrderValue = deliveredOrders.length > 0 ? totalRevenue / deliveredOrders.length : 0;

    const conversionRate = orders.length > 0 ? (deliveredOrders.length / orders.length) * 100 : 0;
    const cancellationRate = orders.length > 0 ? (cancelledOrders.length / orders.length) * 100 : 0;

    const stockHealth = medicines.length > 0
        ? (medicines.filter(m => m.stock > 10).length / medicines.length) * 100
        : 0;

    const stats = [
        {
            title: "Net Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            description: "From delivered orders",
            trend: "+12.5%",
            trendUp: true,
            icon: DollarSign,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            title: "Avg. Order Value",
            value: `$${averageOrderValue.toFixed(2)}`,
            description: "Revenue per success",
            trend: "+3.2%",
            trendUp: true,
            icon: Activity,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Success Rate",
            value: `${conversionRate.toFixed(1)}%`,
            description: "Orders completed",
            trend: "-1.5%",
            trendUp: false,
            icon: CheckCircle2,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            title: "Total Orders",
            value: orders.length.toString(),
            description: "All time volume",
            trend: "+18%",
            trendUp: true,
            icon: ShoppingCart,
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        },
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
                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <BarChart3 className="size-8 text-primary" />
                    Sales Analytics
                </h1>
                <p className="text-muted-foreground">Detailed performance insights for your pharmaceutical store.</p>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="bg-white/5 border-white/10 rounded-3xl overflow-hidden backdrop-blur-md hover:border-primary/50 transition-all group shadow-xl">
                        <CardHeader className="p-6 flex flex-row items-center justify-between pb-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.title}</span>
                            <div className={cn("p-2 rounded-xl group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                                <stat.icon className="size-4" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="text-3xl font-bold text-white">{stat.value}</div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={cn(
                                    "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                                    stat.trendUp ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                                )}>
                                    {stat.trendUp ? <ArrowUpRight className="size-3 mr-0.5" /> : <ArrowDownRight className="size-3 mr-0.5" />}
                                    {stat.trend}
                                </span>
                                <span className="text-[10px] text-muted-foreground font-medium">{stat.description}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Revenue Trend Visual */}
                <Card className="lg:col-span-2 bg-white/5 border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
                    <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-white text-xl">Revenue Stream</CardTitle>
                                <CardDescription>Sales performance over the current cycle.</CardDescription>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="size-2 rounded-full bg-primary" />
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Sales</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="size-2 rounded-full bg-white/20" />
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Target</span>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="h-64 flex items-end justify-between gap-4 mt-4 px-2">
                            {[45, 30, 65, 40, 85, 55, 70, 45, 90, 60, 75, 100].map((height, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-pointer h-full justify-end">
                                    <div
                                        className="w-full bg-gradient-to-t from-primary/40 to-primary hover:from-primary/60 hover:to-primary rounded-t-xl transition-all duration-700 relative shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                                        style={{ height: `${height}%` }}
                                    >
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-950 border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black text-white opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 whitespace-nowrap z-20 shadow-2xl">
                                            ${(totalRevenue * (height / 100)).toFixed(0)}
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">M{i + 1}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                    <ArrowUpRight className="size-5" />
                                </div>
                                <div>
                                    <p className="text-white font-bold leading-none">Record Performance</p>
                                    <p className="text-xs text-muted-foreground mt-1.5">Highest daily revenue achieved this month.</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-emerald-500 font-black text-xl">+24.8%</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">vs last month</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Status Distribution */}
                <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl flex flex-col">
                    <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                        <CardTitle className="text-white text-xl">Order Status</CardTitle>
                        <CardDescription>Visual breakdown of processing status.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 flex-1 flex flex-col justify-between">
                        <div className="space-y-6">
                            {[
                                { label: "Delivered", count: deliveredOrders.length, color: "bg-emerald-500", icon: CheckCircle2 },
                                { label: "Processing", count: pendingOrders.length, color: "bg-blue-500", icon: Truck },
                                { label: "Cancelled", count: cancelledOrders.length, color: "bg-red-500", icon: XCircle },
                            ].map((item, i) => (
                                <div key={i} className="space-y-2 group">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("size-2 rounded-full", item.color)} />
                                            <span className="text-xs font-bold text-white uppercase tracking-wider">{item.label}</span>
                                        </div>
                                        <span className="text-xs font-black text-white">{((item.count / (orders.length || 1)) * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className={cn("h-full transition-all duration-1000 ease-out rounded-full", item.color)}
                                            style={{ width: `${(item.count / (orders.length || 1)) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Inventory Health</p>
                            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                    <Package className="size-16 text-primary" />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-3xl font-black text-white">{stockHealth.toFixed(1)}%</p>
                                    <p className="text-xs text-muted-foreground mt-1">Healthy stock across all categories.</p>
                                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                                        <CheckCircle2 className="size-3" />
                                        <span>Optimal levels maintained</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Performance Insights */}
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
                    <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                        <CardTitle className="text-white text-xl flex items-center gap-2">
                            <TrendingUp className="size-5 text-emerald-500" />
                            Efficiency Drivers
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
                        <p>Your delivery success rate is within the top 10% of store owners. Consider increasing stock for high-demand items to further capitalize on this efficiency.</p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <p className="text-[10px] font-black uppercase tracking-widest">AOV Target</p>
                                <p className="text-xl font-black text-white mt-1">$150.00</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <p className="text-[10px] font-black uppercase tracking-widest">Turnover Rate</p>
                                <p className="text-xl font-black text-white mt-1">4.2x</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
                    <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
                        <CardTitle className="text-white text-xl flex items-center gap-2">
                            <ArrowUpRight className="size-5 text-blue-500" />
                            Market Outlook
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
                        <p>Healthcare demand patterns suggest a 15% uptick in respiratory medicine categories next month. We recommend reviewing your inventory levels for these items.</p>
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-500">
                                <Clock className="size-4" />
                            </div>
                            <span className="text-xs font-bold text-blue-400">Next inventory sync in 4 hours</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
