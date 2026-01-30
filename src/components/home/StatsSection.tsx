"use client";

import { motion } from "framer-motion";
import { Users, Pill, Store, Headset } from "lucide-react";

const stats = [
    {
        label: "Medicines Available",
        value: "15k+",
        icon: Pill,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        label: "Happy Customers",
        value: "50k+",
        icon: Users,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        label: "Licensed Sellers",
        value: "200+",
        icon: Store,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
    {
        label: "Expert Support",
        value: "24/7",
        icon: Headset,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
];

const StatsSection = () => {
    return (
        <section className="py-12 md:py-16 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 blur-[120px] -z-10" />

            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:border-primary/30 transition-all duration-500"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-500`}>
                                    <stat.icon className="size-5" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tighter">
                                    {stat.value}
                                </h3>
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                                    {stat.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
