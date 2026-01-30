"use client";

import { motion } from "framer-motion";
import { useEffect, useState, use } from "react";
import { orderService, Order } from "@/services/order.service";
import { medicineService } from "@/services/medicine.service";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Package, Truck, CheckCircle, XCircle, Clock, ArrowLeft, MapPin, Calendar, CreditCard, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReviewForm } from "@/components/modules/reviews/review-form";
import { Medicine } from "@/types/medicine.type";

interface OrderDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const [order, setOrder] = useState<Order | null>(null);
    const [medicines, setMedicines] = useState<Record<string, Medicine>>({});
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
            } else if (data) {
                setOrder(data);

                // Fetch missing medicine details
                const missingIds = data.items
                    .filter(item => !item.medicine || !item.medicine.name)
                    .map(item => item.medicineId);

                if (missingIds.length > 0) {
                    const fetched: Record<string, Medicine> = {};
                    await Promise.all(missingIds.map(async (mid) => {
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

        fetchOrder();
    }, [session, id, router]);

    if (sessionPending || isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="size-10 animate-spin text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse">Syncing Protocol Data...</p>
                </div>
            </div>
        );
    }

    if (!session || !order) return null;

    const handleCancel = async () => {
        if (!confirm("Are you sure you want to terminate this procurement protocol?")) return;

        setIsCancelling(true);
        const { error } = await orderService.cancelOrder(order.id);
        if (error) {
            toast.error(error);
        } else {
            toast.success("Protocol terminated successfully");
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
            case "DELIVERED": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case "CANCELLED": return "bg-rose-500/10 text-rose-500 border-rose-500/20";
            default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
        }
    };

    const steps = [
        { label: "PROTOCOL INITIATED", status: "PLACED", icon: Clock },
        { label: "LOGISTICS DISPATCH", status: "SHIPPED", icon: Truck },
        { label: "NODE DELIVERY", status: "DELIVERED", icon: CheckCircle },
    ];

    const currentStep = steps.findIndex(s => s.status === order.status);
    const isCancelled = order.status === "CANCELLED";

    return (
        <div className="max-w-6xl mx-auto py-6 space-y-12 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="space-y-4">
                    <Link href="/dashboard/orders" className="inline-flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
                        <ArrowLeft className="size-3" />
                        Return to Ledger
                    </Link>
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                            Order <span className="text-primary italic">Protocol</span>
                        </h1>
                        <p className="text-[10px] md:text-sm text-muted-foreground font-mono tracking-widest uppercase">Signature Reference: #{order.id}</p>
                    </div>
                </div>
                <div className={cn(
                    "flex-shrink-0 flex items-center gap-3 px-6 md:px-8 py-3 rounded-2xl border text-[10px] md:text-xs font-black uppercase tracking-widest shadow-2xl backdrop-blur-md transition-all",
                    getStatusColor(order.status)
                )}>
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                </div>
            </div>

            {/* Protocol Stepper */}
            {!isCancelled && (
                <div className="p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -z-10" />
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 relative z-10">
                        {steps.map((step, idx) => {
                            const isCompleted = currentStep >= idx;
                            const isCurrent = currentStep === idx;
                            const Icon = step.icon;

                            return (
                                <div key={step.label} className="flex-1 w-full relative group/step">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "size-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-xl",
                                            isCompleted ? "bg-primary border-primary text-white shadow-primary/20" : "bg-white/5 border-white/10 text-gray-600"
                                        )}>
                                            <Icon className={cn("size-6", isCurrent && "animate-pulse")} />
                                        </div>
                                        <div className="flex-1">
                                            <p className={cn(
                                                "text-[10px] font-black uppercase tracking-[0.2em] mb-1",
                                                isCompleted ? "text-primary" : "text-gray-600"
                                            )}>{step.label}</p>
                                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                                                {isCompleted ? (isCurrent ? "Active Process" : "Verified") : "Pending Clearance"}
                                            </p>
                                        </div>
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <div className="hidden md:block absolute top-7 left-[calc(100%-120px)] w-24 h-[2px] bg-white/5">
                                            <motion.div
                                                className="h-full bg-primary"
                                                initial={{ width: 0 }}
                                                animate={{ width: isCompleted && currentStep > idx ? "100%" : 0 }}
                                                transition={{ duration: 1 }}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {isCancelled && (
                <div className="p-10 rounded-[2.5rem] bg-rose-500/5 backdrop-blur-xl border border-rose-500/20 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="size-20 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                        <XCircle className="size-10" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-black text-rose-500 uppercase tracking-tighter">Protocol Terminated</h3>
                        <p className="text-sm text-gray-500 font-medium">This acquisition protocol was manually cancelled and is no longer active.</p>
                    </div>
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-10 items-start">
                {/* Left Column: Line Items */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-xl border border-white/10 overflow-hidden relative">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                <Package className="size-5 text-primary" />
                                Acquisition Manifest
                            </h2>
                            <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                                {order.items.length} Unique Nodes
                            </span>
                        </div>

                        <div className="space-y-6">
                            {order.items.map((item, idx) => {
                                const mData = item.medicine || medicines[item.medicineId];
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group/item"
                                    >
                                        <div className="flex flex-wrap md:flex-nowrap gap-6 items-center">
                                            <div className="size-24 rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex-shrink-0 shadow-2xl group-hover/item:scale-105 transition-transform duration-500">
                                                <img
                                                    src={mData?.image || "/placeholder-medicine.png"}
                                                    alt={mData?.name || "REMOVED"}
                                                    className="object-cover size-full"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-white font-black uppercase tracking-tight text-xl mb-1 truncate">
                                                    {mData?.name || "IDENTITY_REMOVED"}
                                                </h3>
                                                <div className="flex flex-wrap gap-3">
                                                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[9px] font-black uppercase tracking-widest">UNIT_QTY: {item.quantity}</span>
                                                    <span className="px-2 py-0.5 bg-white/5 text-gray-500 rounded text-[9px] font-black uppercase tracking-widest">SIGN: {item.medicineId.slice(0, 8).toUpperCase()}</span>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-auto flex items-center justify-between md:flex-col md:items-end gap-3 mt-4 md:mt-0">
                                                <p className="text-2xl font-black text-white tracking-tighter">৳{(order.totalPrice / order.items.length).toFixed(2)}</p>
                                                {order.status === "DELIVERED" && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setOpenReviewId(openReviewId === item.medicineId ? null : item.medicineId)}
                                                        className="h-8 bg-primary/10 text-primary hover:bg-primary/20 font-black uppercase tracking-widest text-[9px] rounded-lg border border-primary/20"
                                                    >
                                                        <MessageSquare className="size-3 mr-1.5" />
                                                        {openReviewId === item.medicineId ? "Cancel Feedback" : "Submit Analysis"}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                        {openReviewId === item.medicineId && (
                                            <div className="mt-6 p-6 bg-white/[0.03] border border-white/10 rounded-2xl animate-in zoom-in-95 duration-300">
                                                <ReviewForm
                                                    medicineId={item.medicineId}
                                                    onSuccess={() => setOpenReviewId(null)}
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Aggregated Valuation</p>
                                <p className="text-lg font-black text-gray-600 uppercase tracking-tighter">Final Settlement Amount</p>
                            </div>
                            <div className="text-right">
                                <p className="text-4xl font-black text-primary tracking-tighter leading-none">৳{order.totalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    {!isCancelled && order.status === "PLACED" && (
                        <Button
                            variant="destructive"
                            className="w-full h-20 rounded-[2rem] bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all shadow-[0_10px_30px_rgba(244,63,94,0.1)] group text-xs font-black uppercase tracking-[0.2em]"
                            onClick={handleCancel}
                            disabled={isCancelling}
                        >
                            {isCancelling ? <Loader2 className="size-5 animate-spin mr-3" /> : <XCircle className="size-5 mr-3 group-hover:rotate-90 transition-transform" />}
                            Terminate Procurement Protocol
                        </Button>
                    )}
                </div>

                {/* Right Column: Information Nodes */}
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
                    <div className="p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-xl border border-white/10 space-y-8 md:space-y-10 group">
                        <div className="space-y-8 relative z-10">
                            <div className="flex gap-5">
                                <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                                    <Calendar className="size-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Transmission Sync</p>
                                    <p className="text-sm text-white font-black uppercase tracking-tight">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="size-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/10">
                                    <MapPin className="size-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Deployment Target</p>
                                    <p className="text-sm text-white font-black uppercase tracking-tight leading-relaxed">{order.address}</p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="size-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/10">
                                    <CreditCard className="size-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Currency Exchange</p>
                                    <p className="text-sm text-white font-black uppercase tracking-tight">On-Site Liquidation (COD)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/30 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700">
                            <Truck className="size-24 text-primary" />
                        </div>
                        <h3 className="text-white font-black uppercase tracking-tight mb-4 flex items-center gap-3 text-lg">
                            <div className="size-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                            Fulfillment Update
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed font-bold uppercase tracking-wider relative z-10">
                            Current operational status: <span className="text-white">{order.status}</span>. Our logistics network is optimizing for maximum delivery velocity. Automated notification sub-routine enabled.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Activity = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
)
