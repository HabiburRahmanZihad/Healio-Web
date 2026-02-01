"use client";

import { useEffect, useState, useCallback } from "react";
import { orderService, Order } from "@/services/order.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Truck, CheckCircle, Clock, ShoppingBag,
    ChevronDown, User, MapPin, X, Terminal,
    Activity, ShieldCheck, Box, Zap, Search, Loader2
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";

export default function SellerOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        search: "",
    });
    const [meta, setMeta] = useState<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    } | null>(null);

    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        const res = await orderService.getSellerOrders({
            page: filters.page,
            limit: filters.limit,
            search: filters.search || undefined,
        });
        if (!res.error && res.data) {
            setOrders(res.data);
            if (res.meta) setMeta(res.meta);
        }
        setIsLoading(false);
    }, [filters]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== filters.search) {
                setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, filters.search]);

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
    };

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        const toastId = toast.loading(`Initiating ${getTechnicalStatus(newStatus)} protocol...`);
        const res = await orderService.updateOrderStatus(orderId, newStatus);

        if (!res.error) {
            toast.success("Protocol updated successfully", { id: toastId });
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
        } else {
            toast.error(res.error || "Protocol sync failed", { id: toastId });
        }
    };

    const getTechnicalStatus = (status: string) => {
        switch (status) {
            case "PLACED": return "AWAITING_UPLINK";
            case "SHIPPED": return "LOGISTICS_DISPATCHED";
            case "DELIVERED": return "PROTOCOL_COMPLETE";
            case "CANCELLED": return "VOID_TERMINATED";
            default: return "UNKNOWN_STATUS";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PLACED": return <Clock className="size-3.5" />;
            case "SHIPPED": return <Truck className="size-3.5" />;
            case "DELIVERED": return <CheckCircle className="size-3.5" />;
            case "CANCELLED": return <X className="size-3.5" />;
            default: return <Clock className="size-3.5" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PLACED": return "text-blue-400 border-blue-500/30 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]";
            case "SHIPPED": return "text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]";
            case "DELIVERED": return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
            case "CANCELLED": return "text-rose-400 border-rose-500/30 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.2)]";
            default: return "text-zinc-400 border-zinc-500/30 bg-zinc-500/10";
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20 px-4 md:px-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[9px] font-black uppercase tracking-[0.2em]">
                        <Terminal className="size-3" />
                        <span>Fulfillment Node: active</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
                        Incoming <span className="text-primary italic">Orders</span>
                    </h1>
                    <p className="text-sm text-muted-foreground font-medium">
                        Process and manage the <span className="text-white font-bold">Fulfillment Protocol Registry</span> for incoming shipments.
                    </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-4 bg-zinc-950/40 px-6 py-3 rounded-2xl border border-white/5 backdrop-blur-md">
                        <Activity className="size-4 text-primary animate-pulse" />
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active Links</span>
                            <span className="text-xs font-bold text-white">{meta?.total || 0} Protocols Identifed</span>
                        </div>
                    </div>
                    <div className="relative group w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Trace Transmission by ID, Name or Email..."
                            className="h-12 pl-12 bg-white/[0.02] border-white/5 text-white rounded-2xl focus:ring-primary/20 focus:border-primary/40 transition-all font-bold text-xs backdrop-blur-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-8">
                {isLoading && orders.length === 0 ? (
                    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
                        <div className="relative">
                            <div className="size-16 rounded-full border-t-2 border-primary animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Box className="size-6 text-primary/50" />
                            </div>
                        </div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">Syncing Ledger...</span>
                    </div>
                ) : orders.length > 0 ? (
                    <>
                        <div className="grid gap-8">
                            {orders.map((order) => (
                                <div key={order.id}>
                                    <Card className="bg-white/[0.02] border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-md hover:border-primary/20 transition-all duration-500 shadow-2xl group relative">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />

                                        <CardHeader className="p-8 md:p-10 border-b border-white/[0.03] bg-white/[0.01]">
                                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="relative size-16 rounded-2xl bg-zinc-950/50 border border-white/5 flex items-center justify-center text-primary group-hover:border-primary/30 transition-all">
                                                        <Box className="size-7 group-hover:scale-110 transition-transform" />
                                                        <div className="absolute -top-1 -right-1 size-3 bg-primary animate-ping rounded-full opacity-20" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex flex-wrap items-center gap-3">
                                                            <CardTitle className="text-xl font-black text-white tracking-tight uppercase">
                                                                Order <span className="text-primary/70">#{order.id.slice(-8).toUpperCase()}</span>
                                                            </CardTitle>
                                                            <div className={cn(
                                                                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 transition-all",
                                                                getStatusColor(order.status)
                                                            )}>
                                                                <div className="size-1.5 rounded-full bg-current animate-pulse" />
                                                                {getStatusIcon(order.status)}
                                                                {getTechnicalStatus(order.status)}
                                                            </div>
                                                        </div>
                                                        <CardDescription className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                                            <Clock className="size-3" />
                                                            Timestamp: {new Date(order.createdAt).toLocaleString().toUpperCase()}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                                <div className="text-left md:text-right bg-zinc-950/50 px-6 py-4 rounded-2xl border border-white/5 min-w-[140px]">
                                                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Valuation</div>
                                                    <div className="text-2xl font-black text-white">৳{order.totalPrice.toLocaleString()}</div>
                                                    <p className="text-[9px] font-bold text-primary uppercase tracking-widest mt-1">
                                                        {order.items.length} {order.items.length === 1 ? 'Asset' : 'Assets'}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="p-8 md:p-10">
                                            <div className="grid md:grid-cols-2 gap-12">
                                                {/* Left Column: Line Items */}
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-0.5 w-6 bg-primary/40 rounded-full" />
                                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Ledger Assets</h4>
                                                    </div>
                                                    <div className="space-y-4">
                                                        {order.items.map((item, i) => (
                                                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/30 border border-white/5 group/item hover:border-primary/10 transition-colors">
                                                                <div className="size-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                                                    <img src={item.medicine?.image || "/placeholder-medicine.png"} alt={item.medicine?.name || "Asset"} className="object-cover size-full group-hover/item:scale-110 transition-transform duration-500" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-black text-white uppercase tracking-tight truncate">{item.medicine?.name || "Redacted Asset"}</p>
                                                                    <div className="flex items-center gap-3 mt-1">
                                                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Units: {item.quantity}</span>
                                                                        <div className="size-1 rounded-full bg-gray-800" />
                                                                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Asset Allocated</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Right Column: Logistics & Actions */}
                                                <div className="space-y-8">
                                                    <div className="space-y-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-0.5 w-6 bg-amber-400/40 rounded-full" />
                                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Logistics Target</h4>
                                                        </div>
                                                        <div className="p-6 rounded-2xl bg-zinc-950/30 border border-white/5 space-y-4">
                                                            <div className="flex items-start gap-4">
                                                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                                                    <MapPin className="size-4" />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Delivery Coordinates</span>
                                                                    <p className="text-xs font-medium text-gray-300 leading-relaxed uppercase">{order.address}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-start gap-4">
                                                                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                                                                    <User className="size-4" />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Consignee</span>
                                                                    <p className="text-xs font-medium text-gray-300 uppercase">{order.customer?.name || "Anonymous Operative"} // Registered Customer</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4 pt-4 border-t border-white/5">
                                                        <div className="flex items-center gap-3">
                                                            <Zap className="size-3 text-primary" />
                                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Execute Protocol</h4>
                                                        </div>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="outline" className="w-full bg-zinc-950 border-white/10 h-14 rounded-2xl flex justify-between items-center hover:bg-white/5 hover:border-primary/30 transition-all px-6 group/btn">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="size-2 rounded-full bg-primary animate-pulse" />
                                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover/btn:text-white transition-colors">Adjust Order Status</span>
                                                                    </div>
                                                                    <ChevronDown className="size-4 text-gray-600 group-data-[state=open]:rotate-180 transition-transform" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-[280px] bg-zinc-950/95 border-white/10 rounded-2xl backdrop-blur-xl p-2 shadow-2xl">
                                                                <DropdownMenuItem
                                                                    onClick={() => handleStatusUpdate(order.id, "PLACED")}
                                                                    className="flex items-center gap-3 py-4 rounded-xl focus:bg-primary/10 group/item transition-colors"
                                                                    disabled={order.status === "PLACED"}
                                                                >
                                                                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                                                        <Clock className="size-4" />
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Awaiting Uplink</span>
                                                                        <span className="text-[8px] font-bold text-gray-600 uppercase">Status: PLACED</span>
                                                                    </div>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleStatusUpdate(order.id, "SHIPPED")}
                                                                    className="flex items-center gap-3 py-4 rounded-xl focus:bg-amber-500/10 group/item transition-colors"
                                                                    disabled={order.status === "SHIPPED"}
                                                                >
                                                                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                                                                        <Truck className="size-4" />
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Logistics Dispatched</span>
                                                                        <span className="text-[8px] font-bold text-gray-600 uppercase">Status: SHIPPED</span>
                                                                    </div>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleStatusUpdate(order.id, "DELIVERED")}
                                                                    className="flex items-center gap-3 py-4 rounded-xl focus:bg-emerald-500/10 group/item transition-colors"
                                                                    disabled={order.status === "DELIVERED"}
                                                                >
                                                                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                                                        <CheckCircle className="size-4" />
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Protocol Complete</span>
                                                                        <span className="text-[8px] font-bold text-gray-600 uppercase">Status: DELIVERED</span>
                                                                    </div>
                                                                </DropdownMenuItem>
                                                                <div className="h-px bg-white/5 my-2" />
                                                                <DropdownMenuItem
                                                                    onClick={() => handleStatusUpdate(order.id, "CANCELLED")}
                                                                    className="flex items-center gap-3 py-4 rounded-xl focus:bg-rose-500/10 text-rose-500 group/item transition-colors"
                                                                    disabled={order.status === "CANCELLED"}
                                                                >
                                                                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
                                                                        <X className="size-4" />
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[10px] font-black uppercase tracking-widest">Void Terminated</span>
                                                                        <span className="text-[8px] font-bold text-gray-600 uppercase">Status: CANCELLED</span>
                                                                    </div>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                        {meta && meta.totalPages > 1 && (
                            <div className="mt-12 flex flex-col items-center gap-4">
                                <Pagination
                                    currentPage={meta.page}
                                    totalPages={meta.totalPages}
                                    onPageChange={handlePageChange}
                                />
                                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
                                    Ledger Synchronized // Page {meta.page} of {meta.totalPages}
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <div>
                        <Card className="bg-white/[0.02] border-white/5 border-dashed rounded-[3rem] p-24 text-center backdrop-blur-md">
                            <div className="flex flex-col items-center gap-6">
                                <div className="relative size-24 rounded-full bg-zinc-950/50 flex items-center justify-center text-muted-foreground border border-white/5">
                                    <ShoppingBag className="size-10 opacity-10" />
                                    <div className="absolute inset-0 bg-white/5 animate-pulse rounded-full" />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Registry Empty</h3>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest max-sm mx-auto leading-relaxed">
                                    No active fulfillment protocols detected matching criteria "{searchTerm}". Protocols will initialize upon customer acquisition.
                                </p>
                                {searchTerm && (
                                    <Button variant="link" onClick={() => setSearchTerm("")} className="text-primary font-black uppercase tracking-widest text-[10px]">Clear Search Protocol</Button>
                                )}
                            </div>
                        </Card>
                    </div>
                )}
            </div>

            {/* Support Message */}
            <div className="text-center">
                <div className="inline-flex items-center gap-2 text-[9px] font-bold text-gray-700 uppercase tracking-[0.4em]">
                    <ShieldCheck className="size-3" />
                    Distributed Fulfillment Network // Secure Protocol
                </div>
            </div>
        </div>
    );
}
