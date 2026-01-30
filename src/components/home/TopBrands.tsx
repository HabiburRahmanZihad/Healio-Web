"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, Award, Globe } from "lucide-react";

const brands = [
    { name: "Pfizer", type: "Core Partner", icon: ShieldCheck },
    { name: "Novartis", type: "Strategic Supply", icon: Target },
    { name: "Roche", type: "Certified Lab", icon: Award },
    { name: "GSK", type: "Global Health", icon: Globe },
    { name: "Sanofi", type: "Wellness Direct", icon: ShieldCheck },
    { name: "Moderna", type: "Genomic Care", icon: Target }
];

export default function TopBrands() {
    return (
        <section className="py-20 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
            {/* Marquee Container */}
            <div className="container mx-auto relative z-10 px-4">
                <div className="text-center mb-12">
                    <p className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-3">Trusted Ecosystem</p>
                    <h2 className="text-2xl font-black uppercase tracking-widest text-white">PHARMACEUTICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">PARTNERS</span></h2>
                </div>

                <div className="relative flex overflow-x-hidden">
                    <div className="flex animate-marquee whitespace-nowrap gap-12 py-4">
                        {[...brands, ...brands].map((brand, i) => (
                            <div key={i} className="flex items-center gap-4 bg-white/[0.03] border border-white/10 px-6 py-4 rounded-2xl group hover:border-primary/50 transition-all duration-300 cursor-pointer">
                                <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <brand.icon className="size-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-black text-white uppercase tracking-tight">{brand.name}</span>
                                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{brand.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Gradient Fades */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
