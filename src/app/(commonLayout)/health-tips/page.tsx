"use client";

import { motion, Variants } from "framer-motion";
import { Heart, Shield, Apple, Pill, BookOpen, ChevronRight, Activity, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

const healthTips = [
    {
        id: 1,
        category: "Daily Wellness",
        title: "The Importance of Hydration",
        description: "Drinking enough water is crucial for maintaining energy levels, brain function, and overall health. Aim for at least 8 glasses a day.",
        icon: Apple,
        color: "text-blue-400",
        bg: "bg-blue-400/10"
    },
    {
        id: 2,
        category: "Medication Safety",
        title: "Never Skip a Dose",
        description: "Consistency is key to effective treatment. Set reminders on your phone to ensure you take your medication at the same time every day.",
        icon: Pill,
        color: "text-purple-400",
        bg: "bg-purple-400/10"
    },
    {
        id: 3,
        category: "Seasonal Health",
        title: "Boosting Immunity in Winter",
        description: "Focus on Vitamin C-rich foods and getting enough sleep. A strong immune system is your best defense against seasonal flu.",
        icon: Shield,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10"
    },
    {
        id: 4,
        category: "Heart Health",
        title: "Cardio for Longevity",
        description: "Just 30 minutes of brisk walking daily can significantly reduce the risk of heart disease and improve your mood.",
        icon: Activity,
        color: "text-red-400",
        bg: "bg-red-400/10"
    },
    {
        id: 5,
        category: "Mental Balance",
        title: "Mindfulness and Stress",
        description: "Take 5 minutes each day for deep breathing exercises. Stress management is just as important as physical health.",
        icon: Heart,
        color: "text-pink-400",
        bg: "bg-pink-400/10"
    },
    {
        id: 6,
        category: "Education",
        title: "Understanding Your Prescription",
        description: "Always read the label and ask your pharmacist if you're unsure about side effects or interactions with other drugs.",
        icon: BookOpen,
        color: "text-orange-400",
        bg: "bg-orange-400/10"
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

export default function HealthTipsPage() {
    const [email, setEmail] = useState("");

    const handleJoinList = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter a valid email address.");
            return;
        }
        toast.success("Welcome to the list!", {
            description: "You'll now receive our weekly medical briefings and wellness inspiration.",
            icon: <Sparkles className="size-4 text-emerald-500" />,
        });
        setEmail("");
    };

    return (
        <div className="min-h-screen bg-background py-16 px-4 overflow-hidden relative">
            {/* Ambient Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 size-[600px] bg-primary rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.05, 0.1, 0.05]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 left-0 size-[400px] bg-emerald-500 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 -z-10"
            />

            <div className="container mx-auto relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black tracking-widest uppercase mb-4"
                        >
                            <Sparkles className="size-3.5" />
                            <span>Wellness Hub</span>
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight uppercase">
                            YOUR PATH TO <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary text-5xl md:text-7xl">VITALITY</span>
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
                            Expert-curated health advice and daily wellness tips to help you live your best, most vibrant life.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
                >
                    {healthTips.map((tip) => {
                        const Icon = tip.icon;
                        return (
                            <motion.div
                                key={tip.id}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="group"
                            >
                                <Card className="h-full bg-card/40 border-white/5 backdrop-blur-xl hover:bg-card/60 hover:border-emerald-500/30 transition-all duration-500 rounded-[2rem] overflow-hidden">
                                    <CardHeader className="p-8 pb-0">
                                        <div className={`size-14 rounded-2xl ${tip.bg} flex items-center justify-center mb-6 shadow-inner group-hover:shadow-emerald-500/20 transition-all duration-500`}>
                                            <Icon className={`size-7 ${tip.color}`} />
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase block">
                                                {tip.category}
                                            </span>
                                            <h3 className="text-xl font-black text-white leading-tight tracking-tight uppercase">
                                                {tip.title}
                                            </h3>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <p className="text-muted-foreground leading-relaxed text-sm mb-6 font-medium line-clamp-3">
                                            {tip.description}
                                        </p>
                                        <Button variant="ghost" className="p-0 h-auto text-emerald-400 hover:text-white font-black tracking-widest uppercase flex items-center gap-2 text-[10px] transition-all">
                                            KEEP READING
                                            <ChevronRight className="size-3.5" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Interactive Newsletter */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative group p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent"
                >
                    <div className="bg-card/80 backdrop-blur-2xl rounded-[2.4rem] p-12 md:p-16 text-center overflow-hidden">
                        <div className="absolute -top-20 -left-20 size-40 border border-emerald-500/10 rounded-full" />
                        <div className="absolute -bottom-20 -right-20 size-48 border border-primary/10 rounded-full" />

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight uppercase">
                            STAY SHARP, <br /><span className="text-emerald-400 italic">STAY HEALTHY</span>
                        </h2>
                        <p className="text-sm md:text-base text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed font-medium">
                            Join over 50,000+ people receiving our weekly medical briefings and wellness inspiration.
                        </p>

                        <form onSubmit={handleJoinList} className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto relative z-10">
                            <input
                                type="email"
                                placeholder="name@email.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-14 px-6 rounded-2xl bg-white/5 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all flex-[2]"
                            />
                            <Button type="submit" className="w-full sm:flex-1 h-14 rounded-2xl bg-emerald-500 hover:bg-primary text-white font-black text-xs tracking-widest uppercase shadow-lg shadow-emerald-500/20 transition-all">
                                JOIN LIST
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
