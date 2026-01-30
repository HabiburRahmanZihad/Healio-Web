"use client";

import { motion } from "framer-motion";
import { Send, Bell, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        toast.success("Thank you for subscribing! Keep an eye on your inbox.");
        setEmail("");
    };

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary/20 via-zinc-900 to-primary/5 border border-white/10 p-12 md:p-24 shadow-2xl">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-96 bg-primary/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 size-64 bg-primary/10 rounded-full blur-[80px]" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                                <Bell className="size-3" />
                                Latest Updates
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
                                Don't Miss Out on <br />
                                <span className="text-primary italic">Essential Updates.</span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-md">
                                Subscribe to our newsletter and get exclusive deals, healthcare tips, and early notifications on stock availability.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-inner">
                                        <ShieldCheck className="size-5" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">No Spam, Ever</span>
                                </div>
                                <div className="hidden sm:block w-px h-6 bg-white/10" />
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-inner">
                                        <Mail className="size-5" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Unsubscribe Anytime</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-2xl" />
                            <form onSubmit={handleSubscribe} className="relative p-3 rounded-[2.5rem] bg-zinc-900/50 backdrop-blur-xl border border-white/10 flex flex-col sm:flex-row gap-3 shadow-2xl">
                                <Input
                                    type="email"
                                    placeholder="Enter your email address..."
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-14 sm:h-16 px-8 rounded-[2rem] bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary/20 transition-all border-none shadow-none"
                                />
                                <Button
                                    type="submit"
                                    className="h-14 sm:h-16 px-10 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all group"
                                >
                                    <Send className="mr-3 size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    Subscribe
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
