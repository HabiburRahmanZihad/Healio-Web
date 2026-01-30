"use client";

import { useEffect, useState } from "react";
import { orderService, Order } from "@/services/order.service";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Package, Truck, CheckCircle, XCircle, Clock, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function OrdersPage() {
    const router = useRouter();
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!sessionPending && !session) {
            router.push("/login?callbackURL=/dashboard/orders");
        }
    }, [session, sessionPending, router]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!session) return;
            setIsLoading(true);
            const { data, error } = await orderService.getMyOrders();
            if (error) {
                toast.error(error);
            } else {
                setOrders(data || []);
            }
            setIsLoading(false);
        };

        fetchOrders();
    }, [session]);

    if (sessionPending || isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) return null;

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PLACED": return <Clock className="size-4" />;
            case "SHIPPED": return <Truck className="size-4" />;
            case "DELIVERED": return <CheckCircle className="size-4" />;
            case "CANCELLED": return <XCircle className="size-4" />;
            default: return <Package className="size-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PLACED": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "SHIPPED": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
            case "DELIVERED": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "CANCELLED": return "bg-red-500/10 text-red-500 border-red-500/20";
            default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
        }
    };

    if (orders.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
                <div className="p-6 bg-white/5 rounded-full border border-white/10">
                    <Package className="size-16 text-gray-400" />
                </div>
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-white">No orders yet</h1>
                    <p className="text-gray-400 max-w-xs">
                        You haven't placed any orders yet. Start shopping to see your orders here.
                    </p>
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl px-8">
                    <Link href="/medicines">Explore Medicines</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">My Orders</h1>
                <p className="text-muted-foreground">Track and manage your recent purchases.</p>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-primary/30 group"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-400 font-mono">#{order.id.slice(-8).toUpperCase()}</span>
                                    <div className={cn(
                                        "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
                                        getStatusColor(order.status)
                                    )}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">Ordered on {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-12">
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total Price</p>
                                    <p className="text-xl font-bold text-white">৳{order.totalPrice.toFixed(2)}</p>
                                </div>
                                <Button asChild variant="ghost" className="rounded-xl group/btn hover:bg-primary/10 hover:text-primary transition-all">
                                    <Link href={`/dashboard/orders/${order.id}`} className="flex items-center gap-2">
                                        View Details
                                        <ChevronRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Quick View Items */}
                        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-none border-t border-white/5 pt-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="relative size-14 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/10" title={item.medicine?.name || "Medicine Removed"}>
                                    <img src={item.medicine?.image || "/placeholder-medicine.png"} alt={item.medicine?.name || "Medicine"} className="object-cover size-full group-hover:scale-110 transition-transform duration-500" />
                                    {item.quantity > 1 && (
                                        <span className="absolute bottom-0 right-0 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-tl-lg border-t border-l border-background">
                                            x{item.quantity}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
