"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/providers/CartProvider";
import { orderService } from "@/services/order.service";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
    Loader2,
    CheckCircle2,
    ShieldCheck,
    Truck,
    ShoppingBag,
    MapPin,
    CreditCard,
    ArrowRight,
    Wallet
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, totalPrice, clearCart, itemCount } = useCart();
    const { data: session, isPending: sessionPending } = authClient.useSession();

    const [address, setAddress] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        if (!sessionPending && !session) {
            toast.error("Please login to proceed to checkout");
            router.push(`/login?callbackURL=/checkout`);
        }
    }, [session, sessionPending, router]);

    if (sessionPending) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                    <Loader2 className="size-12 animate-spin text-primary relative z-10" />
                </div>
            </div>
        );
    }

    if (!session) return null;

    if (itemCount === 0 && !orderSuccess) {
        router.push("/cart");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!address.trim()) {
            toast.error("Please provide a shipping address", {
                className: "bg-zinc-900 border-red-500/50 text-white",
            });
            return;
        }

        setIsSubmitting(true);
        const orderData = {
            items: cart.map(item => ({
                medicineId: item.id,
                quantity: item.quantity
            })),
            totalPrice,
            address,
            status: "PLACED" as const
        };

        const { error } = await orderService.placeOrder(orderData);

        if (error) {
            toast.error(error, {
                className: "bg-zinc-900 border-red-500/50 text-white",
            });
            setIsSubmitting(false);
        } else {
            setOrderSuccess(true);
            clearCart();
            toast.success("Order protocol initiated successfully", {
                className: "bg-zinc-900 border-primary/50 text-white",
            });
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center py-20">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="max-w-2xl w-full mx-4 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-2xl text-center space-y-10 relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 size-40 bg-primary/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />

                    <div className="relative inline-flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                            className="bg-primary/20 p-8 rounded-full border border-primary/30 relative z-10"
                        >
                            <CheckCircle2 className="size-20 text-primary" />
                        </motion.div>
                        <div className="absolute inset-0 bg-primary/30 blur-[40px] rounded-full animate-pulse" />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
                            Protocol <span className="text-primary">Complete</span>
                        </h1>
                        <p className="text-gray-400 font-medium max-w-sm mx-auto text-lg leading-relaxed">
                            Your pharmaceutical requisitions have been logged and routed for immediate distribution.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button asChild variant="ghost" className="flex-1 py-7 text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all">
                            <Link href="/medicines">Return to Archive</Link>
                        </Button>
                        <Button asChild className="flex-1 bg-primary hover:bg-primary/90 py-7 text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95">
                            <Link href="/dashboard/orders" className="flex items-center justify-center gap-2">
                                Track Shipment
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden py-16">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 size-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="absolute bottom-0 left-0 size-[400px] bg-blue-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 -z-10" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="max-w-3xl mb-12 space-y-3">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest"
                    >
                        <ShieldCheck className="size-3" />
                        <span>Secure Fulfillment Protocol</span>
                    </motion.div>
                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
                        INITIALIZE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">CHECKOUT</span>
                    </h1>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 items-start">
                    {/* Checkout Form */}
                    <div className="lg:col-span-7 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 size-24 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

                            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/5">
                                <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20">
                                    <MapPin className="size-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Deployment Zone</h2>
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Distribution Endpoint Details</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Requisitioner</Label>
                                        <div className="px-4 py-3 rounded-xl bg-white/[0.01] border border-white/10 text-gray-400 font-bold text-sm">
                                            {session.user.name}
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Contact Email</Label>
                                        <div className="px-4 py-3 rounded-xl bg-white/[0.01] border border-white/10 text-gray-400 font-bold truncate text-sm">
                                            {session.user.email}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="address" className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Delivery Protocol Address</Label>
                                    <Textarea
                                        id="address"
                                        placeholder="Specify House, Street, Sector, and Metropolitan District..."
                                        required
                                        rows={3}
                                        value={address}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAddress(e.target.value)}
                                        className="bg-white/[0.02] border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:bg-white/[0.05] rounded-xl p-4 text-base font-medium transition-all duration-300 min-h-[120px]"
                                    />
                                </div>

                                <div className="pt-2 space-y-4">
                                    <div className="group relative p-4 rounded-xl bg-primary/5 border border-primary/10 transition-all hover:bg-primary/10">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                                                <Wallet className="size-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-0.5">
                                                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Transaction Method</p>
                                                    <span className="text-[8px] font-black text-primary bg-primary/10 px-1.5 py-0.5 rounded-full uppercase tracking-tighter border border-primary/20">Active</span>
                                                </div>
                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Cash on Delivery (Standard)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-14 text-sm font-black uppercase tracking-widest rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 group transition-all duration-300 active:scale-[0.98]"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="size-4 animate-spin" />
                                                <span>Synchronizing...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span>Authorize Order</span>
                                                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>

                    {/* Summary Section */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 sticky top-24 space-y-8 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 size-32 bg-primary/20 blur-[60px] -translate-y-1/2 translate-x-1/2 -z-10" />

                            <div className="space-y-0.5 pt-2">
                                <h2 className="text-xl font-black text-white uppercase tracking-tight">Inventory Summary</h2>
                                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Package Manifest</p>
                            </div>

                            <div className="max-h-[250px] overflow-y-auto pr-2 -mr-2 space-y-3 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="group flex gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 transition-all hover:bg-white/5 hover:border-white/10">
                                        <div className="relative size-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/5 border border-white/10 p-1">
                                            <div className="relative w-full h-full rounded-md overflow-hidden">
                                                <Image
                                                    src={item.image || "/placeholder-medicine.png"}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                                            <h4 className="text-xs font-black text-white uppercase truncate group-hover:text-primary transition-colors">{item.name}</h4>
                                            <div className="flex items-center justify-between">
                                                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Qty: {item.quantity}</p>
                                                <p className="text-xs font-black text-white">৳{(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-gray-500">
                                        <span>Subtotal</span>
                                        <span className="text-white">৳{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-gray-500">
                                        <span>Logistics</span>
                                        <span className="text-primary">Gratis</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5">
                                    <div className="flex justify-between items-end">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Final Requisition Cost</p>
                                        <p className="text-3xl font-black text-white leading-none tracking-tight">
                                            ৳{totalPrice.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-4 py-1 opacity-20">
                                <ShieldCheck className="size-3.5" />
                                <CreditCard className="size-3.5" />
                                <Truck className="size-3.5" />
                                <ShoppingBag className="size-3.5" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
