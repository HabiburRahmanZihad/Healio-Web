"use client";

import { useEffect, useState } from "react";
import { orderService, Order } from "@/services/order.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag, Clock, Truck, CheckCircle, AlertCircle, User, MapPin, DollarSign, Search, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminOrderManagement() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchOrders = async () => {
        setIsLoading(true);
        // Using getSellerOrders because on backend admin role correctly selects all orders via the same endpoint
        const res = await orderService.getSellerOrders();
        if (!res.error && res.data) {
            setOrders(res.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        const toastId = toast.loading(`Updating order status to ${newStatus}...`);
        const res = await orderService.updateOrderStatus(orderId, newStatus);

        if (!res.error) {
            toast.success("Order status updated", { id: toastId });
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
        } else {
            toast.error(res.error || "Failed to update status", { id: toastId });
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PLACED": return <Clock className="size-4" />;
            case "SHIPPED": return <Truck className="size-4" />;
            case "DELIVERED": return <CheckCircle className="size-4" />;
            case "CANCELLED": return <AlertCircle className="size-4" />;
            default: return <Clock className="size-4" />;
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case "PLACED": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "SHIPPED": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
            case "DELIVERED": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "CANCELLED": return "bg-red-500/10 text-red-500 border-red-500/20";
            default: return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
        }
    };

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Order Monitoring</h1>
                    <p className="text-muted-foreground">Manage and track all customer orders across the entire platform.</p>
                </div>
                <div className="relative group w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search by Order ID or Address..."
                        className="pl-10 bg-white/5 border-white/10 text-white rounded-xl focus:ring-primary focus:border-primary transition-all w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <Card className="bg-white/5 border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Order ID</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Customer Info</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Status</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Items</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Total</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform border border-primary/20">
                                                    <ShoppingBag className="size-5" />
                                                </div>
                                                <span className="font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tighter">
                                                    #{order.id.slice(-8)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-1.5 min-w-[200px]">
                                                <div className="flex items-center gap-2 text-white text-sm font-medium">
                                                    <MapPin className="size-3 text-muted-foreground" />
                                                    <span className="truncate max-w-[250px]">{order.address}</span>
                                                </div>
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider pl-5">{new Date(order.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex justify-center">
                                                <span className={cn(
                                                    "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm",
                                                    getStatusClass(order.status)
                                                )}>
                                                    {getStatusIcon(order.status)}
                                                    {order.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className="text-white font-bold bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 text-xs">
                                                {order.items.length} Units
                                            </span>
                                        </td>
                                        <td className="p-6 text-right font-bold text-emerald-500">
                                            <div className="flex items-center justify-end gap-1">
                                                <span className="text-xs">৳</span>
                                                <span>{order.totalPrice.toFixed(2)}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="bg-white/5 text-white rounded-xl hover:bg-white/10 hover:text-primary transition-all border border-white/5 flex items-center gap-2">
                                                        Update Status
                                                        <ChevronDown className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-zinc-950 border-white/10 rounded-xl p-2 w-48 shadow-2xl">
                                                    {["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"].map((status) => (
                                                        <DropdownMenuItem
                                                            key={status}
                                                            onClick={() => handleStatusUpdate(order.id, status)}
                                                            className={cn(
                                                                "flex items-center gap-2 py-2.5 rounded-lg cursor-pointer transition-colors focus:bg-white/5 focus:text-primary",
                                                                order.status === status ? "text-primary font-bold bg-white/5" : "text-slate-300"
                                                            )}
                                                        >
                                                            {getStatusIcon(status)}
                                                            <span className="text-xs font-bold uppercase tracking-wider">{status}</span>
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-muted-foreground italic">
                                        No matching orders were found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
