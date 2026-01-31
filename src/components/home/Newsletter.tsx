"use client";

import { Bell, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        toast.success("Synchronized with our pharmaceutical updates.");
        setEmail("");
    };

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-primary/10 via-zinc-950 to-primary/5 border border-white/5 p-10 md:p-16 shadow-2xl">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-80 bg-primary/10 rounded-full blur-[100px]" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-[0.3em]">
                                <Bell className="size-3" />
                                Protocol Updates
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] uppercase tracking-tighter">
                                STAY <span className="text-primary italic">SYNCHRONIZED</span> <br />
                                WITH VITAL CARE
                            </h2>
                            <p className="text-sm text-gray-500 max-w-sm font-medium leading-relaxed">
                                Join our elite health network. Receive exclusive insights, pharmaceutical alerts, and optimized wellness protocols.
                            </p>

                            <div className="flex flex-wrap items-center gap-6 pt-4">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="size-4 text-emerald-500" />
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Zero Compromise</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="size-4 text-primary" />
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Instant Intel</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-2xl" />
                            <form onSubmit={handleSubscribe} className="relative p-2 rounded-[1.5rem] bg-white/[0.02] backdrop-blur-xl border border-white/5 flex flex-col sm:flex-row gap-2 shadow-2xl">
                                <Input
                                    type="email"
                                    placeholder="your-email@protocol.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-11 px-6 rounded-xl bg-transparent border-none text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0 text-[11px] font-medium"
                                />
                                <Button
                                    type="submit"
                                    className="h-11 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 group"
                                >
                                    Subscribe To Network
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
