"use client";

import { useEffect, useState } from "react";
import { orderService, Order } from "@/services/order.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle, Clock, ShoppingBag, Loader2, AlertCircle, ChevronDown, User, MapPin, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SellerOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        setIsLoading(true);
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

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        );
    }

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

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-white tracking-tight">Incoming Orders</h1>
                <p className="text-muted-foreground">Manage and process orders from your customers.</p>
            </div>

            <div className="grid gap-6">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <Card key={order.id} className="bg-white/5 border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm group hover:border-primary/30 transition-all shadow-lg">
                            <CardHeader className="p-6 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                                        <ShoppingBag className="size-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-lg text-white">Order #{order.id.slice(-8).toUpperCase()}</CardTitle>
                                            <span className={cn(
                                                "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                                                getStatusClass(order.status)
                                            )}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </span>
                                        </div>
                                        <CardDescription className="flex items-center gap-2 mt-1">
                                            <Clock className="size-3" />
                                            {new Date(order.createdAt).toLocaleString()}
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-white">৳{order.totalPrice.toFixed(2)}</div>
                                    <p className="text-xs text-muted-foreground">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Order Items</h4>
                                        <div className="space-y-3">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                                    <div className="size-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                                        <img src={item.medicine?.image || "/placeholder-medicine.png"} alt={item.medicine?.name || "Medicine"} className="object-cover size-full" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-white truncate">{item.medicine?.name || "Unknown Medicine"}</p>
                                                        <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Shipping Details</h4>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex items-start gap-2 text-white">
                                                    <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                                                    <span className="leading-relaxed">{order.address}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-white/5">
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Update Status</h4>
                                            <div className="flex items-center gap-3">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="outline" className="bg-white/5 border-white/10 h-11 rounded-xl flex-1 justify-between hover:bg-white/10 group">
                                                            <span className="flex items-center gap-2">
                                                                {getStatusIcon(order.status)}
                                                                Change Status
                                                            </span>
                                                            <ChevronDown className="size-4 opacity-50 group-data-[state=open]:rotate-180 transition-transform" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-[200px] rounded-xl">
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusUpdate(order.id, "PLACED")}
                                                            className="flex items-center gap-2 py-2.5 rounded-lg"
                                                            disabled={order.status === "PLACED"}
                                                        >
                                                            <Clock className="size-4 text-blue-500" />
                                                            <span>Placed</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusUpdate(order.id, "SHIPPED")}
                                                            className="flex items-center gap-2 py-2.5 rounded-lg"
                                                            disabled={order.status === "SHIPPED"}
                                                        >
                                                            <Truck className="size-4 text-orange-500" />
                                                            <span>Shipped</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusUpdate(order.id, "DELIVERED")}
                                                            className="flex items-center gap-2 py-2.5 rounded-lg"
                                                            disabled={order.status === "DELIVERED"}
                                                        >
                                                            <CheckCircle className="size-4 text-green-500" />
                                                            <span>Delivered</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusUpdate(order.id, "CANCELLED")}
                                                            className="flex items-center gap-2 py-2.5 rounded-lg text-red-500 focus:text-red-500"
                                                            disabled={order.status === "CANCELLED"}
                                                        >
                                                            <X className="size-4" />
                                                            <span>Cancelled</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card className="bg-white/5 border-white/10 border-dashed rounded-3xl p-20 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="size-20 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground mb-2">
                                <ShoppingBag className="size-10 opacity-20" />
                            </div>
                            <h3 className="text-xl font-bold text-white">No orders yet</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto">
                                When customers purchase your medicines, they will appear here for you to fulfill.
                            </p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
