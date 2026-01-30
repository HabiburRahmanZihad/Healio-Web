"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const medicines = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        brand: "GSK Pharmacopoeia",
        price: 15,
        oldPrice: 20,
        rating: 4.8,
        reviews: 124,
        category: "Pain Relief",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop",
        isRecommended: true
    },
    {
        id: 2,
        name: "Vitamin C 1000mg",
        brand: "Nature's Way Lab",
        price: 120,
        oldPrice: 150,
        rating: 4.9,
        reviews: 89,
        category: "Vitamins",
        image: "https://images.unsplash.com/photo-1471864190281-ad5fe9ca1a1d?q=80&w=2070&auto=format&fit=crop",
        isRecommended: false
    },
    {
        id: 3,
        name: "Antiseptic Liquid 250ml",
        brand: "Dettol Professional",
        price: 85,
        oldPrice: 95,
        rating: 4.7,
        reviews: 210,
        category: "First Aid",
        image: "https://images.unsplash.com/photo-1583459183353-29ecf6775791?q=80&w=2070&auto=format&fit=crop",
        isRecommended: true
    },
    {
        id: 4,
        name: "Cough Syrup 100ml",
        brand: "Benadryl Experts",
        price: 65,
        oldPrice: 80,
        rating: 4.5,
        reviews: 56,
        category: "Cough & Cold",
        image: "https://images.unsplash.com/photo-1550572017-ed200f5e6343?q=80&w=2070&auto=format&fit=crop",
        isRecommended: false
    },
];

const LatestMedicines = () => {
    return (
        <section className="py-16 md:py-20 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">RECENT <span className="text-primary">ARRIVALS</span></h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                            Verified pharmaceutical arrivals. Stored in climate-controlled environments.
                        </p>
                    </div>
                    <Button variant="outline" className="h-10 rounded-xl px-6 border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 bg-transparent transition-all active:scale-95" asChild>
                        <Link href="/medicines">View Full Apothecary</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {medicines.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-primary/20 transition-all duration-500"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-square overflow-hidden bg-white/5">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {item.isRecommended && (
                                        <Badge className="bg-primary text-white border-0 text-[8px] font-black uppercase tracking-widest px-2 py-0.5">Top Tier</Badge>
                                    )}
                                    {item.oldPrice > item.price && (
                                        <Badge variant="secondary" className="bg-orange-500 text-white border-0 text-[8px] font-black uppercase tracking-widest px-2 py-0.5">
                                            {Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}% RELIEF
                                        </Badge>
                                    )}
                                </div>

                                {/* Hover Actions */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button size="icon" variant="secondary" className="rounded-xl shadow-xl hover:scale-110 transition-transform" asChild>
                                        <Link href={`/medicines/${item.id}`}>
                                            <Eye className="size-4" />
                                        </Link>
                                    </Button>
                                    <Button size="icon" className="rounded-xl shadow-xl bg-primary hover:bg-primary/90 hover:scale-110 transition-transform text-white">
                                        <ShoppingCart className="size-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-4">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{item.category}</span>
                                    <h3 className="font-black text-sm leading-tight text-white group-hover:text-primary transition-colors cursor-pointer uppercase tracking-tight">
                                        {item.name}
                                    </h3>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.brand}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex items-center text-yellow-500">
                                        <Star className="size-3 fill-current" />
                                    </div>
                                    <span className="text-[10px] font-black text-white">{item.rating}</span>
                                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">({item.reviews})</span>
                                </div>

                                <div className="flex items-baseline gap-3 pt-2">
                                    <span className="text-xl font-black text-white">৳{item.price}</span>
                                    {item.oldPrice > item.price && (
                                        <span className="text-xs text-gray-500 font-bold line-through">৳{item.oldPrice}</span>
                                    )}
                                </div>

                                <Button className="w-full h-10 rounded-xl gap-2 bg-white/5 border border-white/10 hover:bg-primary hover:text-white hover:border-primary text-[10px] font-black uppercase tracking-widest transition-all active:scale-95" variant="outline">
                                    <ShoppingCart className="size-3" />
                                    Add to Cart
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestMedicines;
