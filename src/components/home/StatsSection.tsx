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
        <section className="py-24 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                    <stat.icon className="size-8" />
                                </div>
                                <h3 className="text-4xl font-black text-white mb-2 tracking-tight">
                                    {stat.value}
                                </h3>
                                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
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
