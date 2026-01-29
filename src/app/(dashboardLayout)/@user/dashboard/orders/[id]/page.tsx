"use client";

import { useEffect, useState, use } from "react";
import { orderService, Order } from "@/services/order.service";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Package, Truck, CheckCircle, XCircle, Clock, ArrowLeft, MapPin, Calendar, CreditCard, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReviewForm } from "@/components/modules/reviews/review-form";

interface OrderDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCancelling, setIsCancelling] = useState(false);
    const [openReviewId, setOpenReviewId] = useState<string | null>(null);

    useEffect(() => {
        if (!sessionPending && !session) {
            router.push(`/login?callbackURL=/dashboard/orders/${id}`);
        }
    }, [session, sessionPending, router, id]);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!session) return;
            setIsLoading(true);
            const { data, error } = await orderService.getOrderById(id);
            if (error) {
                toast.error(error);
                router.push("/dashboard/orders");
            } else {
                setOrder(data);
            }
            setIsLoading(false);
        };

        fetchOrder();
    }, [session, id, router]);

    if (sessionPending || isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session || !order) return null;

    const handleCancel = async () => {
        if (!confirm("Are you sure you want to cancel this order?")) return;

        setIsCancelling(true);
        const { error } = await orderService.cancelOrder(order.id);
        if (error) {
            toast.error(error);
        } else {
            toast.success("Order cancelled successfully");
            setOrder({ ...order, status: "CANCELLED" });
        }
        setIsCancelling(false);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PLACED": return <Clock className="size-5" />;
            case "SHIPPED": return <Truck className="size-5" />;
            case "DELIVERED": return <CheckCircle className="size-5" />;
            case "CANCELLED": return <XCircle className="size-5" />;
            default: return <Package className="size-5" />;
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

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <Link href="/dashboard/orders" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group px-1">
                <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                Back to Orders
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5 p-6 rounded-3xl border border-white/10">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Order Details</h1>
                    <p className="text-muted-foreground font-mono text-sm tracking-wider uppercase">#{order.id}</p>
                </div>
                <div className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-2xl border text-sm font-bold self-start md:self-center shadow-lg",
                    getStatusColor(order.status)
                )}>
                    {getStatusIcon(order.status)}
                    {order.status}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column: Order Items */}
                <div className="md:col-span-2 space-y-6">
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Package className="size-5 text-primary" />
                            Ordered Items
                        </h2>
                        <div className="space-y-6">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="space-y-4">
                                    <div className="flex gap-4 items-center">
                                        <div className="size-20 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                                            <img src={item.medicine?.image || "/placeholder-medicine.png"} alt={item.medicine?.name || "Medicine Removed"} className="object-cover size-full" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white font-semibold truncate text-lg">{item.medicine?.name || "Medicine Removed"}</h3>
                                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="text-lg font-bold text-white">
                                                ${(order.totalPrice / order.items.length).toFixed(2)}
                                            </div>
                                            {order.status === "DELIVERED" && (
                                                <button
                                                    onClick={() => setOpenReviewId(openReviewId === item.medicineId ? null : item.medicineId)}
                                                    className="text-xs text-primary hover:text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                                                >
                                                    <MessageSquare className="size-3.5" />
                                                    {openReviewId === item.medicineId ? "Cancel" : "Review"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {openReviewId === item.medicineId && (
                                        <div className="animate-in slide-in-from-top-4 duration-300 pt-2 pb-4">
                                            <ReviewForm
                                                medicineId={item.medicineId}
                                                onSuccess={() => setOpenReviewId(null)}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="h-px bg-white/10 my-4" />
                        <div className="flex justify-between items-center text-xl font-bold text-white px-2">
                            <span className="text-muted-foreground">Total Paid</span>
                            <span className="text-primary">${order.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    {order.status === "PLACED" && (
                        <Button
                            variant="destructive"
                            className="w-full py-8 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5 group text-lg font-bold"
                            onClick={handleCancel}
                            disabled={isCancelling}
                        >
                            {isCancelling ? <Loader2 className="size-5 animate-spin mr-2" /> : <XCircle className="size-5 mr-2 group-hover:scale-110 transition-transform" />}
                            Cancel This Order
                        </Button>
                    )}
                </div>

                {/* Right Column: Order Info */}
                <div className="space-y-6">
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-8">
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="p-2.5 bg-primary/20 rounded-xl shrink-0 h-fit">
                                    <Calendar className="size-5 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">Ordered At</p>
                                    <p className="text-sm text-white font-medium">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-2.5 bg-primary/20 rounded-xl shrink-0 h-fit">
                                    <MapPin className="size-5 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">Shipping To</p>
                                    <p className="text-sm text-white leading-relaxed font-medium">{order.address}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-2.5 bg-primary/20 rounded-xl shrink-0 h-fit">
                                    <CreditCard className="size-5 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">Payment</p>
                                    <p className="text-sm text-white font-bold">Cash on Delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-primary/5 border border-primary/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                            <Truck className="size-20 text-primary" />
                        </div>
                        <h3 className="text-white font-bold mb-3 flex items-center gap-2 text-lg">
                            <div className="size-2 bg-primary rounded-full animate-pulse" />
                            Delivery Status
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed font-medium relative z-10">
                            Your order is currently {order.status.toLowerCase()}. We'll notify you when it's out for delivery.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
