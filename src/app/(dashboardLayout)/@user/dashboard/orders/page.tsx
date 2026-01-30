"use client";

import { useEffect, useState } from "react";
import { orderService, Order } from "@/services/order.service";
import { medicineService } from "@/services/medicine.service";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Package, Truck, CheckCircle, XCircle, Clock, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Medicine } from "@/types/medicine.type";

export default function OrdersPage() {
    const router = useRouter();
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const [orders, setOrders] = useState<Order[]>([]);
    const [medicines, setMedicines] = useState<Record<string, Medicine>>({});
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
            } else if (data) {
                setOrders(data);

                // Extract unique medicine IDs that need enrichment
                const missingIds = new Set<string>();
                data.forEach(order => {
                    order.items.forEach(item => {
                        if (!item.medicine || !item.medicine.name) {
                            missingIds.add(item.medicineId);
                        }
                    });
                });

                if (missingIds.size > 0) {
                    const fetched: Record<string, Medicine> = {};
                    await Promise.all(Array.from(missingIds).map(async (mid) => {
                        const { data: mData } = await medicineService.getMedicineById(mid);
                        if (mData) {
                            fetched[mid] = {
                                ...mData,
                                id: mData.id || (mData as any).medicine_id,
                                name: mData.name,
                                image: mData.image
                            } as Medicine;
                        }
                    }));
                    setMedicines(prev => ({ ...prev, ...fetched }));
                }
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
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-700">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full animate-pulse" />
                    <div className="relative p-8 bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
                        <Package className="size-20 text-gray-500" />
                    </div>
                </div>
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter">No Acquisition Logs</h1>
                    <p className="text-sm text-gray-500 max-w-sm font-medium leading-relaxed">
                        Your pharmaceutical acquisition history is currently empty. Initialize a procurement protocol to see logs here.
                    </p>
                </div>
                <Button asChild className="h-14 bg-primary hover:bg-primary/90 rounded-2xl px-10 text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95">
                    <Link href="/medicines">Initialize Procurement</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-12 py-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                        <Activity className="size-3" />
                        <span>Transaction Ledger Alpha</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                        My <span className="text-primary italic">Orders</span>
                    </h1>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium max-w-xl">
                        A centralized log of all pharmaceutical procurement protocols initiated under your authorization signature.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Total Protocols</p>
                        <p className="text-xl font-black text-white leading-none">{orders.length}</p>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-right">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Active Status</p>
                        <p className="text-xl font-black text-emerald-500 leading-none">Healthy</p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-xl border border-white/10 transition-all duration-500 hover:border-primary/40 group overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent skew-x-12 translate-x-1/2 -z-10 group-hover:from-primary/10 transition-colors" />

                        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-8">
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 shadow-inner">
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Protocol ID</span>
                                        <span className="text-xs font-black text-white font-mono tracking-tight uppercase">#{order.id.slice(-8)}</span>
                                    </div>
                                    <div className={cn(
                                        "flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-xl transition-all",
                                        getStatusColor(order.status)
                                    )}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="size-3.5 text-gray-600" />
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none uppercase">Initialized: {new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 leading-none">Index Valuation</p>
                                    <p className="text-3xl font-black text-white tracking-tighter leading-none">৳{order.totalPrice.toFixed(2)}</p>
                                </div>
                                <Button asChild variant="ghost" className="h-14 rounded-2xl bg-white/5 hover:bg-primary/10 hover:text-primary transition-all duration-300 border border-white/5 hover:border-primary/20 group/btn px-6">
                                    <Link href={`/dashboard/orders/${order.id}`} className="flex items-center gap-3 font-black uppercase tracking-tighter text-xs">
                                        View Details
                                        <ChevronRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Quick View Items */}
                        <div className="mt-8 flex flex-wrap gap-4 scrollbar-none pt-6 border-t border-white/10">
                            {order.items.map((item, idx) => {
                                const mData = item.medicine || medicines[item.medicineId];
                                return (
                                    <div
                                        key={idx}
                                        className="group/item relative h-16 px-4 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center gap-3 hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-300"
                                    >
                                        <div className="size-10 rounded-xl overflow-hidden bg-black/20 border border-white/5 flex-shrink-0 shadow-lg group-hover/item:scale-110 transition-transform">
                                            <img
                                                src={mData?.image || "/placeholder-medicine.png"}
                                                alt={mData?.name || "Medicine"}
                                                className="object-cover size-full"
                                            />
                                        </div>
                                        <div className="min-w-0 pr-2">
                                            <p className="text-[10px] font-black text-white uppercase tracking-tight truncate max-w-[120px]">
                                                {mData?.name || "REMOVED"}
                                            </p>
                                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="absolute -top-1.5 -right-1.5 size-5 bg-primary text-white text-[9px] font-black flex items-center justify-center rounded-lg shadow-lg border border-white/10 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                            x{item.quantity}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const Activity = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
)

const Calendar = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
)
