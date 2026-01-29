"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-background pt-16 pb-20 lg:pt-24 lg:pb-32">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 text-center lg:text-left space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                            <ShieldCheck className="size-4" />
                            <span>Verified OTC Medicines Only</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                            Your Trusted Partner in <br />
                            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                                Health & Wellness
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Healio brings authentic OTC medicines, vitamins, and personal care products right to your doorstep. Fast, secure, and reliable.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Button size="lg" className="h-14 px-8 text-base gap-2 bg-primary hover:bg-primary/90 rounded-full shadow-lg shadow-primary/20" asChild>
                                <Link href="/shop">
                                    Shop Now
                                    <ShoppingCart className="size-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-base gap-2 rounded-full border-2" asChild>
                                <Link href="/about">
                                    Learn More
                                    <ArrowRight className="size-5" />
                                </Link>
                            </Button>
                        </div>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Truck className="size-5 text-primary" />
                                <span>Fast Home Delivery</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <ShieldCheck className="size-5 text-primary" />
                                <span>100% Authentic</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="relative z-10 w-full aspect-square max-w-[500px] mx-auto overflow-hidden rounded-3xl group">
                            <img
                                src="https://images.unsplash.com/photo-1576091160550-2173dad9948f?q=80&w=2070&auto=format&fit=crop"
                                alt="Health and Wellness"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        </div>

                        {/* Stats Badge */}
                        <div className="absolute -bottom-6 -left-6 md:-left-12 bg-background border p-6 rounded-2xl shadow-xl z-20 hidden sm:block animate-bounce-slow">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="text-2xl">💊</span>
                                </div>
                                <div>
                                    <p className="text-xl font-bold">1000+</p>
                                    <p className="text-xs text-muted-foreground">Verified Products</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
