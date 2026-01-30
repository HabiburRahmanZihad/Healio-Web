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
        <section className="py-16 md:py-20 relative overflow-hidden bg-white/[0.01]">
            <div className="container px-4 mx-auto">
                <div className="text-center mx-auto mb-12 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white"
                    >
                        THE HEALIO <span className="text-primary">PROTOCOL</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[11px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed"
                    >
                        A synchronized 4-step framework for rapid pharmaceutical access.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting Line for Large Screens */}
                    <div className="hidden lg:block absolute top-[40px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent z-0" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className="relative mb-6">
                                <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className={`${step.bg} ${step.color} size-16 rounded-[1.5rem] flex items-center justify-center border border-white/5 relative z-10 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}>
                                    <step.icon className="size-6" />
                                    <div className="absolute -top-2 -right-2 size-6 rounded-full bg-background border border-white/10 flex items-center justify-center text-[9px] font-black text-white ring-2 ring-background">
                                        0{index + 1}
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xs font-black text-white mb-2 group-hover:text-primary transition-colors uppercase tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed px-4">
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
