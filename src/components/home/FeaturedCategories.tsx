"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Pill, Baby, HeartPulse, Sparkles, Syringe, PlusSquare } from "lucide-react";

const categories = [
    {
        name: "OTC Medicines",
        icon: <Pill className="size-5" />,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        href: "/medicines?category=otc",
        count: "450+ Units"
    },
    {
        name: "Vitamins",
        icon: <Syringe className="size-5" />,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        href: "/medicines?category=vitamins",
        count: "200+ Units"
    },
    {
        name: "Personal Care",
        icon: <Sparkles className="size-5" />,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        href: "/medicines?category=personal-care",
        count: "300+ Units"
    },
    {
        name: "Baby Care",
        icon: <Baby className="size-5" />,
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        href: "/medicines?category=baby-care",
        count: "150+ Units"
    },
    {
        name: "Heart Health",
        icon: <HeartPulse className="size-5" />,
        color: "text-red-500",
        bg: "bg-red-500/10",
        href: "/medicines?category=heart-health",
        count: "80+ Units"
    },
    {
        name: "First Aid",
        icon: <PlusSquare className="size-5" />,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        href: "/medicines?category=first-aid",
        count: "120+ Units"
    },
];

const FeaturedCategories = () => {
    return (
        <section className="py-16 md:py-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mx-auto mb-12 space-y-4">
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">VITAL <span className="text-primary">CATEGORIES</span></h2>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                        Exploration through our pharmaceutical network categories.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category, i) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link
                                href={category.href}
                                className="group flex flex-col items-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-primary/30 transition-all duration-300"
                            >
                                <div className={`p-3 rounded-xl ${category.bg} ${category.color} group-hover:scale-110 transition-transform`}>
                                    {category.icon}
                                </div>
                                <h3 className="mt-4 text-[11px] font-black uppercase tracking-tight text-center text-white group-hover:text-primary transition-colors">{category.name}</h3>
                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">{category.count}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;
