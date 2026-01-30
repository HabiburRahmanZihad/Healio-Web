"use client";

import { motion } from "framer-motion";
import { PhoneCall, MessageCircle, MapPin, Ambulance, Sparkles, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const emergencyActions = [
    {
        title: "24/7 Hotline",
        desc: "Immediate medical assistance at your fingertips.",
        icon: PhoneCall,
        action: "Call 10678",
        color: "from-red-500/20 to-orange-500/20",
        border: "border-red-500/30",
        iconColor: "text-red-500"
    },
    {
        title: "Expert Chat",
        desc: "Consult with verified pharmacists instantly.",
        icon: MessageCircle,
        action: "Start Consultation",
        color: "from-blue-500/20 to-indigo-500/20",
        border: "border-blue-500/30",
        iconColor: "text-blue-500"
    },
    {
        title: "Quick Locate",
        desc: "Find verified 24-hour pharmacies near you.",
        icon: MapPin,
        action: "Find Now",
        color: "from-emerald-500/20 to-teal-500/20",
        border: "border-emerald-500/30",
        iconColor: "text-emerald-500"
    },
    {
        title: "Ambulance",
        desc: "Rapid emergency transport services.",
        icon: Ambulance,
        action: "Request Support",
        color: "from-rose-500/20 to-pink-500/20",
        border: "border-rose-500/30",
        iconColor: "text-rose-500"
    }
];

export default function EmergencyCare() {
    return (
        <section className="py-16 md:py-24 px-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-red-500/5 blur-[120px] -z-10" />

            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-[10px] font-black uppercase tracking-widest"
                        >
                            <ShieldAlert className="size-3" />
                            <span>Emergency Protocol Enabled</span>
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                            CRITICAL <span className="text-red-500">CARE</span> WHEN EVERY <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">SECOND COUNTS</span>
                        </h2>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">
                            Access our prioritized support network for urgent medical needs. Direct connection to verified pharmacists and emergency logistics providers.
                        </p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {emergencyActions.map((action, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group relative"
                        >
                            <div className={`p-6 rounded-[2rem] bg-gradient-to-br ${action.color} backdrop-blur-sm border ${action.border} transition-all duration-300 h-full flex flex-col justify-between overflow-hidden`}>
                                {/* Decorative particles */}
                                <div className="absolute -top-12 -right-12 size-24 bg-white/5 blur-2xl rounded-full" />

                                <div className="relative space-y-4">
                                    <div className={`size-12 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center ${action.iconColor} shadow-xl`}>
                                        <action.icon className="size-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-black uppercase text-white mb-2">{action.title}</h3>
                                        <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{action.desc}</p>
                                    </div>
                                </div>

                                <Button
                                    asChild
                                    className="mt-6 w-full h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-black uppercase tracking-widest group-hover:bg-red-500 group-hover:border-red-500 transition-all duration-300"
                                >
                                    {i === 0 ? (
                                        <a href="tel:10678">{action.action}</a>
                                    ) : i === 1 ? (
                                        <a href="https://wa.me/8801234567890?text=I%20need%20urgent%20medical%20consultation" target="_blank" rel="noopener noreferrer">{action.action}</a>
                                    ) : i === 2 ? (
                                        <a href="https://www.google.com/maps/search/24+hour+pharmacy+near+me" target="_blank" rel="noopener noreferrer">{action.action}</a>
                                    ) : (
                                        <a href="tel:999">{action.action}</a>
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
