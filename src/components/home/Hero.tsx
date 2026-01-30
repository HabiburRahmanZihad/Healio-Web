"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, ShieldCheck, Truck, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-background pt-12 pb-16 lg:pt-20 lg:pb-24">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-[1.2] text-center lg:text-left space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20"
                        >
                            <Sparkles className="size-3" />
                            <span>Precision Healthcare Logistics</span>
                        </motion.div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[1]">
                            ACCESS TO <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-emerald-400 animate-gradient-x">
                                VITALITY & CARE
                            </span>
                        </h1>

                        <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            Healio bridges the gap between patient and pharmacy. Experience a synchronized network of verified medicines, vitamins, and wellness essentials delivered with radical speed.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                            <Button size="lg" className="h-11 px-8 text-[11px] font-black uppercase tracking-widest gap-2 bg-primary hover:bg-primary/90 rounded-xl shadow-xl shadow-primary/20 transition-all active:scale-95 group" asChild>
                                <Link href="/medicines">
                                    Browse Apothecary
                                    <ShoppingCart className="size-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-11 px-8 text-[11px] font-black uppercase tracking-widest gap-2 rounded-xl border-white/10 hover:bg-white/5 bg-transparent transition-all active:scale-95" asChild>
                                <Link href="/about">
                                    Our Protocol
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                <Truck className="size-4 text-primary" />
                                <span>Cold-Chain Optimized</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                <ShieldCheck className="size-4 text-emerald-500" />
                                <span>Verified Authenticity</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 w-full aspect-square max-w-[460px] mx-auto overflow-hidden rounded-[2.5rem] border border-white/10 p-2 bg-white/5 shadow-2xl group">
                            <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=2069&auto=format&fit=crop"
                                    alt="Health and Wellness"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* Floating Tech Badge */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="absolute -bottom-4 -left-4 md:-left-8 bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl z-20 hidden sm:block ring-1 ring-white/20"
                        >
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                                    <ShieldCheck className="size-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xl font-black text-white leading-none">100%</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">Audit Verified</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
