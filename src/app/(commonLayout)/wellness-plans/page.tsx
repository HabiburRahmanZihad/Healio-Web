"use client";

import { motion, Variants } from "framer-motion";
import { Check, Sparkles, Shield, Zap, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

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
        <div className="min-h-screen bg-background py-16 px-4 overflow-hidden relative">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 size-[600px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="absolute bottom-0 left-0 size-[400px] bg-emerald-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 -z-10" />

            <div className="container mx-auto max-w-6xl">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                            <Sparkles className="size-3" />
                            <span>Premium Care for Everyone</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
                            ELEVATE YOUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-blue-500 animate-gradient-x text-4xl md:text-6xl">HEALTH JOURNEY</span>
                        </h1>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            Choose a plan that fits your lifestyle. Our wellness plans are designed to provide you with consistent, high-quality care and exclusive benefits.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
                >
                    {plans.map((plan) => {
                        const Icon = plan.icon;
                        return (
                            <motion.div
                                key={plan.name}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="relative group"
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 inset-x-0 flex justify-center z-20">
                                        <span className="bg-primary text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-primary/20 animate-pulse">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <Card className={`h-full bg-card/40 backdrop-blur-xl border ${plan.border} group-hover:border-primary/50 transition-all duration-500 rounded-[2rem] overflow-hidden flex flex-col`}>
                                    <CardHeader className="p-8 pb-4">
                                        <div className={`size-12 rounded-xl ${plan.bg} flex items-center justify-center mb-6 border border-white/5`}>
                                            <Icon className={`size-6 ${plan.color}`} />
                                        </div>
                                        <CardTitle className="text-2xl font-black text-white uppercase">{plan.name}</CardTitle>
                                        <div className="flex items-baseline gap-1 mt-2">
                                            <span className="text-3xl font-black text-white">{plan.price}</span>
                                            <span className="text-xs text-muted-foreground font-medium">{plan.period}</span>
                                        </div>
                                        <p className="text-muted-foreground mt-3 leading-relaxed font-medium text-xs">
                                            {plan.description}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="p-8 pt-2 flex-grow">
                                        <div className="h-px bg-white/5 mb-6" />
                                        <ul className="space-y-3">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-start gap-3 group/item">
                                                    <div className={`mt-0.5 size-4 rounded-full ${plan.bg} flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform`}>
                                                        <Check className={`size-2.5 ${plan.color}`} />
                                                    </div>
                                                    <span className="text-xs text-gray-400 font-medium group-hover/item:text-white transition-colors">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter className="p-8 pt-0">
                                        <Button
                                            onClick={() => toast.info(`The ${plan.name} plan is coming soon!`, {
                                                description: "We're putting the finishing touches on our premium wellness features.",
                                                icon: <Sparkles className="size-4 text-primary" />,
                                            })}
                                            className={`w-full h-12 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${plan.popular ? 'bg-primary hover:bg-emerald-500 shadow-lg shadow-primary/20' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}
                                        >
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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center p-8 rounded-[2.5rem] bg-card/20 border border-white/5 backdrop-blur-2xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div className="space-y-1.5">
                            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                <Shield className="size-5 text-primary" />
                            </div>
                            <h4 className="text-base font-black text-white tracking-tight uppercase">Secure Payments</h4>
                            <p className="text-xs text-muted-foreground font-medium">Encrypted transactions via SSL.</p>
                        </div>
                        <div className="space-y-1.5">
                            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                <Zap className="size-5 text-primary" />
                            </div>
                            <h4 className="text-base font-black text-white tracking-tight uppercase">Instant Activation</h4>
                            <p className="text-xs text-muted-foreground font-medium">Get benefits immediately after signup.</p>
                        </div>
                        <div className="space-y-1.5">
                            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                <Heart className="size-5 text-primary" />
                            </div>
                            <h4 className="text-base font-black text-white tracking-tight uppercase">Expert Support</h4>
                            <p className="text-xs text-muted-foreground font-medium">24/7 access to medical professionals.</p>
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
