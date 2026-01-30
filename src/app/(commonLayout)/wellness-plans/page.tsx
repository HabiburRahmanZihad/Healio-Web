"use client";

import { motion, Variants } from "framer-motion";
import { Check, Sparkles, Shield, Zap, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
    {
        name: "Basic Care",
        price: "৳499",
        period: "/month",
        description: "Essential wellness support for individuals starting their health journey.",
        features: [
            "Monthly health check-up reminder",
            "Access to basic medical archive",
            "5% discount on all OTC medicines",
            "Community support access",
        ],
        icon: Heart,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
    },
    {
        name: "Pro Wellness",
        price: "৳1,499",
        period: "/month",
        description: "Comprehensive health management for dedicated wellness seekers.",
        features: [
            "Everything in Basic Care",
            "Priority same-day delivery",
            "15% discount on all medicines",
            "Direct chat with registered pharmacists",
            "Digital health record vault",
        ],
        icon: Zap,
        color: "text-primary",
        bg: "bg-primary/10",
        border: "border-primary/30",
        popular: true,
    },
    {
        name: "Elite Health",
        price: "৳2,999",
        period: "/month",
        description: "Ultimate health security with concierge-level medical support.",
        features: [
            "Everything in Pro Wellness",
            "Home laboratory sample collection",
            "Personalized nutrition & diet plans",
            "25% flat discount on all services",
            "Dedicated family health advisor",
        ],
        icon: Award,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
};

export default function WellnessPlans() {
    return (
        <div className="min-h-screen bg-background py-24 px-4 overflow-hidden relative">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 size-[800px] bg-primary/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="absolute bottom-0 left-0 size-[600px] bg-emerald-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 -z-10" />

            <div className="container mx-auto max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-black uppercase tracking-widest mb-6">
                            <Sparkles className="size-3.5" />
                            <span>Premium Care for Everyone</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
                            ELEVATE YOUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-blue-500 animate-gradient-x">HEALTH JOURNEY</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Choose a plan that fits your lifestyle. Our wellness plans are designed to provide you with consistent, high-quality care and exclusive benefits.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10"
                >
                    {plans.map((plan) => {
                        const Icon = plan.icon;
                        return (
                            <motion.div
                                key={plan.name}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="relative group"
                            >
                                {plan.popular && (
                                    <div className="absolute -top-5 inset-x-0 flex justify-center z-20">
                                        <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-2xl shadow-primary/40 animate-pulse">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <Card className={`h-full bg-card/40 backdrop-blur-2xl border ${plan.border} group-hover:border-primary/50 transition-all duration-500 rounded-[3rem] overflow-hidden flex flex-col`}>
                                    <CardHeader className="p-10 pb-6">
                                        <div className={`size-16 rounded-2xl ${plan.bg} flex items-center justify-center mb-8 border border-white/5`}>
                                            <Icon className={`size-8 ${plan.color}`} />
                                        </div>
                                        <CardTitle className="text-3xl font-black text-white">{plan.name}</CardTitle>
                                        <div className="flex items-baseline gap-1 mt-4">
                                            <span className="text-4xl font-black text-white">{plan.price}</span>
                                            <span className="text-muted-foreground font-medium">{plan.period}</span>
                                        </div>
                                        <p className="text-muted-foreground mt-4 leading-relaxed font-medium text-sm">
                                            {plan.description}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="p-10 pt-4 flex-grow">
                                        <div className="h-px bg-white/5 mb-8" />
                                        <ul className="space-y-4">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-start gap-3 group/item">
                                                    <div className={`mt-1 size-5 rounded-full ${plan.bg} flex items-center justify-center flex-shrink-0 group-hover/item:scale-125 transition-transform`}>
                                                        <Check className={`size-3 ${plan.color}`} />
                                                    </div>
                                                    <span className="text-sm text-gray-300 font-medium group-hover/item:text-white transition-colors">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter className="p-10 pt-0">
                                        <Button className={`w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${plan.popular ? 'bg-primary hover:bg-emerald-500 shadow-xl shadow-primary/20' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}>
                                            Choose {plan.name}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* FAQ or Trust Badge Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-32 text-center p-12 rounded-[4rem] bg-card/20 border border-white/5 backdrop-blur-3xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                        <div className="space-y-2">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <Shield className="size-6 text-primary" />
                            </div>
                            <h4 className="text-lg font-black text-white tracking-tight">Secure Payments</h4>
                            <p className="text-sm text-muted-foreground font-medium">Encrypted transactions via SSL.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <Zap className="size-6 text-primary" />
                            </div>
                            <h4 className="text-lg font-black text-white tracking-tight">Instant Activation</h4>
                            <p className="text-sm text-muted-foreground font-medium">Get benefits immediately after signup.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <Heart className="size-6 text-primary" />
                            </div>
                            <h4 className="text-lg font-black text-white tracking-tight">Expert Support</h4>
                            <p className="text-sm text-muted-foreground font-medium">24/7 access to medical professionals.</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 15s ease infinite;
                }
            `}</style>
        </div>
    );
}
