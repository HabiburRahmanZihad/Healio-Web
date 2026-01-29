"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/providers/CartProvider";
import { orderService } from "@/services/order.service";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { toast } from "sonner";
import { Loader2, CheckCircle2, ShieldCheck, Truck } from "lucide-react";

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
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
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
            toast.error("Please provide a shipping address");
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

        const { data, error } = await orderService.placeOrder(orderData);

        if (error) {
            toast.error(error);
            setIsSubmitting(false);
        } else {
            toast.success("Order placed successfully!");
            setOrderSuccess(true);
            clearCart();
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="p-6 bg-green-500/10 rounded-full border border-green-500/20">
                    <CheckCircle2 className="size-20 text-green-500" />
                </div>
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white">Order Received!</h1>
                    <p className="text-gray-400 max-w-sm">
                        Thank you for your purchase. Your order is being processed and will be shipped soon.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button asChild variant="outline" className="rounded-xl px-8">
                        <Link href="/medicines">Continue Shopping</Link>
                    </Button>
                    <Button asChild className="rounded-xl px-8 bg-primary hover:bg-primary/90">
                        <Link href="/dashboard/orders">Track My Order</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-5 gap-12">
                {/* Checkout Form */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <div className="p-2 bg-primary/20 rounded-lg">
                                <Truck className="size-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Shipping Information</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                                <Input
                                    id="name"
                                    value={session.user.name}
                                    disabled
                                    className="bg-white/5 border-white/10 text-gray-400 cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-gray-300">Shipping Address</Label>
                                <Textarea
                                    id="address"
                                    placeholder="Enter your full shipping address (House, Street, Area, City)..."
                                    required
                                    rows={4}
                                    value={address}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAddress(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white focus:border-primary transition-colors"
                                />
                                <p className="text-xs text-gray-500">
                                    Currently only supporting Cash on Delivery (COD).
                                </p>
                            </div>

                            <div className="pt-4">
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary mb-6">
                                    <ShieldCheck className="size-5" />
                                    <span className="text-sm font-medium">Payment Method: Cash on Delivery</span>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-7 text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 shadow-lg shadow-purple-500/20"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Placing Order...
                                        </>
                                    ) : (
                                        "Confirm My Order"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="lg:col-span-2">
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-6 sticky top-24">
                        <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">Order Summary</h2>

                        <div className="max-h-60 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-3">
                                    <div className="relative size-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/5 border border-white/10">
                                        <Image
                                            src={item.image || "/placeholder-medicine.png"}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center min-w-0">
                                        <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-sm font-semibold text-white">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-white/10" />

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>Estimated Shipping</span>
                                <span className="text-green-400 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-white pt-2">
                                <span>Total</span>
                                <span className="text-purple-400">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
