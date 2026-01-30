"use client";

import { motion } from "framer-motion";
import { ArrowRight, User, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const articles = [
    {
        title: "The Future of Digital Pharmaceutical Care",
        desc: "Insights into how blockchain and AI are securing the global medicine supply chain.",
        tag: "Technology",
        author: "Dr. Sarah J.",
        date: "Jan 12, 2026",
        image: "https://res.cloudinary.com/dzokxtodh/image/upload/v1769775992/ChatGPT_Image_Jan_30_2026_06_06_27_PM_azq3gz.png"
    },
    {
        title: "Navigating Immunity in the Urban Age",
        desc: "Essential health protocols for busy professionals living in metropolitan areas.",
        tag: "Wellness",
        author: "Marcuss K.",
        date: "Jan 08, 2026",
        image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1974&auto=format&fit=crop"
    },
    {
        title: "Medication Safety: A Patient's Guide",
        desc: "Everything you need to know about prescription verification and adverse effects.",
        tag: "Safety",
        author: "Pharm. Elena",
        date: "Jan 05, 2026",
        image: "https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function BlogSection() {
    return (
        <section className="py-24 px-4 relative overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest"
                        >
                            <Sparkles className="size-3" />
                            <span>Expert Knowledge Hub</span>
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">HEALTH <span className="text-primary">INSIGHTS</span> & INTEL</h2>
                    </div>

                    <Link
                        href="/health-tips"
                        className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors"
                    >
                        Explore Journal
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col h-full bg-white/2 border border-white/5 rounded-[2rem] overflow-hidden hover:border-primary/20 transition-all duration-500"
                        >
                            <div className="relative aspect-16/10 overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-md text-white rounded-full border border-white/10">
                                        {article.tag}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 p-8 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight group-hover:text-primary transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                        {article.desc}
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-white/5 flex items-center justify-center text-primary border border-white/10 group-hover:border-primary/50 transition-all">
                                            <User className="size-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white uppercase leading-none mb-1">{article.author}</p>
                                            <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black leading-none">{article.date}</p>
                                        </div>
                                    </div>
                                    <button
                                        className="text-gray-600 hover:text-primary transition-colors"
                                        title="Like this article"
                                        aria-label="Like this article">
                                        <Heart className="size-4 group-hover:fill-primary" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
