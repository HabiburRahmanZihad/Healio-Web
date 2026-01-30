"use client";

import { motion } from "framer-motion";
import { Search, ShoppingCart, CreditCard, Truck } from "lucide-react";

const steps = [
    {
        title: "Search Medicine",
        description: "Browse our extensive catalog of 15k+ genuine medicines and healthcare products.",
        icon: Search,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "Add to Cart",
        description: "Select your required items and add them to your secure medical cart with ease.",
        icon: ShoppingCart,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        title: "Secure Payment",
        description: "Checkout safely using our encrypted payment gateway with multiple payment options.",
        icon: CreditCard,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        title: "Fast Delivery",
        description: "Get your medicines delivered to your doorstep within hours with real-time tracking.",
        icon: Truck,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-24 bg-white/[0.02]">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-white tracking-tight"
                    >
                        How <span className="text-primary">Healio</span> Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg"
                    >
                        Getting your healthcare needs delivered is simpler than ever. Follow these 4 easy steps.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                    {/* Connecting Lines for Large Screens */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-24 z-0" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className="relative mb-8">
                                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className={`${step.bg} ${step.color} size-20 rounded-3xl flex items-center justify-center border border-white/5 relative z-10 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-2xl shadow-black/50`}>
                                    <step.icon className="size-10" />
                                    <div className="absolute -top-3 -right-3 size-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-xs font-black text-white ring-4 ring-black">
                                        {index + 1}
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors uppercase tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed px-4">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
