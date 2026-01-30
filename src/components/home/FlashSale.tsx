"use client";

import { motion } from "framer-motion";
import { Zap, Timer, ArrowRight, ShoppingCart, Percent } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const flashDeals = [
    {
        id: "1",
        name: "Premium Vitamin C Complex",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2060&auto=format&fit=crop",
        discount: "45% OFF",
        price: 12.50,
        originalPrice: 22.70,
        stockRemaining: 12,
        totalStock: 50,
        timeLeft: "04:22:15"
    },
    {
        id: "2",
        name: "Advanced Zinc Immunity",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?q=80&w=2070&auto=format&fit=crop",
        discount: "30% OFF",
        price: 18.00,
        originalPrice: 25.70,
        stockRemaining: 5,
        totalStock: 30,
        timeLeft: "02:15:30"
    }
];

export default function FlashSale() {
    return (
        <section className="py-20 px-4 relative">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-[10px] font-black uppercase tracking-widest"
                        >
                            <Zap className="size-3 fill-yellow-500" />
                            <span>Synchronized Flash Event</span>
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">LIMITED <span className="text-yellow-500">PHASE</span> OFFERS</h2>
                    </div>

                    <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 px-6 py-4 rounded-2xl">
                        <Timer className="size-5 text-yellow-500 animate-pulse" />
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Ending In</span>
                            <span className="text-xl font-black text-white tabular-nums">03:45:12</span>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {flashDeals.map((deal, i) => (
                        <motion.div
                            key={deal.id}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="group relative h-[300px] rounded-[2.5rem] overflow-hidden bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row shadow-2xl"
                        >
                            {/* Image Part */}
                            <div className="relative w-full sm:w-[40%] h-[150px] sm:h-full overflow-hidden">
                                <Image
                                    src={deal.image}
                                    alt={deal.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden sm:block" />
                                <div className="absolute top-4 left-4">
                                    <div className="bg-yellow-500 text-black px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                                        {deal.discount}
                                    </div>
                                </div>
                            </div>

                            {/* Info Part */}
                            <div className="flex-1 p-8 flex flex-col justify-between relative z-10">
                                <div className="space-y-3">
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-yellow-500 transition-colors">
                                        {deal.name}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl font-black text-white">৳{deal.price}</span>
                                        <span className="text-sm text-gray-500 line-through">৳{deal.originalPrice}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                            <span>Remaining Status</span>
                                            <span className="text-yellow-500">{deal.stockRemaining} Units Only</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-500 rounded-full"
                                                style={{ width: `${(deal.stockRemaining / deal.totalStock) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    <Button asChild className="w-full h-11 bg-white text-black hover:bg-yellow-500 hover:text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-95 group/btn">
                                        <Link href={`/medicines/${deal.id}`} className="flex items-center justify-center gap-2">
                                            Acquire Now
                                            <ShoppingCart className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
