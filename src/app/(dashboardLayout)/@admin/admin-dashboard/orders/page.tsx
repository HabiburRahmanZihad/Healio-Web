"use client";

import { useEffect, useState } from "react";
import { orderService, Order } from "@/services/order.service";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Search,
    Activity,
    Package,
    Hash,
    ChevronDown
} from "lucide-react";
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
        const res = await orderService.getMyOrders(); // Admin uses getMyOrders to trigger getAdminOrders in backend
        if (!res.error && res.data) {
            setOrders(res.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        const toastId = toast.loading(`Updating protocol status to ${newStatus}...`);
        const res = await orderService.updateOrderStatus(orderId, newStatus);

        if (!res.error) {
            toast.success("Protocol status synchronized", { id: toastId });
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
        } else {
            toast.error(res.error || "Protocol violation: Update failed", { id: toastId });
        }
    };

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.customer?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.customer?.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalPrice, 0);

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="relative">
                    <div className="size-16 rounded-full border-t-2 border-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Activity className="size-6 text-primary/50" />
                    </div>
                </div>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">Retrieving Transaction Ledger...</span>
            </div>
        );
    }

    return (
        <div className="space-y-10 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8 relative">
                <div className="absolute -bottom-[1px] left-0 w-48 h-[1px] bg-primary" />
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[9px] font-black uppercase tracking-[0.2em]">
                        <Package className="size-3 animate-pulse" />
                        <span>Transmission Protocol: Syncing</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                        Nexus Order <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 italic">Ledger</span>
                    </h1>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.1em] max-w-xl">
                        Universal oversight of all pharmaceutical transmissions across the <span className="text-white">Healio Network</span>.
                    </p>
                </div>
                <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Total Nexus Value</p>
                        <p className="text-2xl font-black text-white tracking-tighter">৳{totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="relative group w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Trace Transmission by ID..."
                            className="h-12 pl-12 bg-white/[0.02] border-white/5 text-white rounded-2xl focus:ring-primary/20 focus:border-primary/40 transition-all font-bold text-xs backdrop-blur-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <Card className="bg-white/[0.02] border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl relative border-l border-t border-white/10">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Transmission ID</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Node Destination</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-center">Protocol Status</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Credit Value</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-white/[0.03] transition-all duration-500 group relative"
                                    >
                                        <td className="p-8">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-all duration-500 shadow-lg">
                                                    <Hash className="size-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors italic">#{order.id.slice(-8).toUpperCase()}</span>
                                                    <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-1">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex flex-col gap-1">
                                                <div className="text-xs text-white font-black uppercase tracking-tight">{order.customer?.name || "Anonymous Node"}</div>
                                                <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{order.customer?.email || "Unknown CID"}</div>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <div className="flex justify-center">
                                                <div className={cn(
                                                    "px-4 py-1.5 rounded-xl border text-[9px] font-black tracking-[0.15em] flex items-center gap-2 shadow-lg",
                                                    order.status === "DELIVERED" ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20 shadow-emerald-500/5" :
                                                        order.status === "PLACED" ? "bg-orange-500/5 text-orange-400 border-orange-500/20 shadow-orange-500/5" :
                                                            "bg-blue-500/5 text-blue-400 border-blue-500/20 shadow-blue-500/5"
                                                )}>
                                                    <div className={cn(
                                                        "size-1.5 rounded-full animate-pulse",
                                                        order.status === "DELIVERED" ? "bg-emerald-400" : order.status === "PLACED" ? "bg-orange-400" : "bg-blue-400"
                                                    )} />
                                                    ORD_{order.status.toUpperCase()}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8 text-right">
                                            <div className="flex items-center justify-end gap-1.5 font-black text-base text-white tracking-tighter">
                                                <span className="text-[10px] text-primary">৳</span>
                                                <span>{order.totalPrice.toFixed(2)}</span>
                                            </div>
                                        </td>
                                        <td className="p-8 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="size-12 bg-white/[0.03] text-gray-500 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all border border-transparent hover:border-primary/20">
                                                        <ChevronDown className="size-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-zinc-950 border-white/10 rounded-xl p-2 w-48 shadow-2xl backdrop-blur-xl">
                                                    {["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"].map((status) => (
                                                        <DropdownMenuItem
                                                            key={status}
                                                            onClick={() => handleStatusUpdate(order.id, status)}
                                                            className="rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-400 focus:bg-primary/10 focus:text-primary transition-all cursor-pointer py-3"
                                                        >
                                                            SYNC_{status}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-24 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-20">
                                            <Hash className="size-16 text-gray-500" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Zero matching transmissions found in sector.</p>
                                        </div>
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
