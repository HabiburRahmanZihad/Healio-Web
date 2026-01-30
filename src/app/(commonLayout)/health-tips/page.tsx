"use client";

import { motion, Variants } from "framer-motion";
import { Heart, Shield, Apple, Pill, BookOpen, ChevronRight, Activity, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
    return (
        <div className="min-h-screen bg-background py-24 px-4 overflow-hidden relative">
            {/* Ambient Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 size-[800px] bg-primary rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 -z-10"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.05, 0.15, 0.05]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 left-0 size-[600px] bg-emerald-500 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 -z-10"
            />

            <div className="container mx-auto relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-black tracking-widest uppercase mb-6"
                        >
                            <Sparkles className="size-4" />
                            <span>Wellness Hub</span>
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.85] tracking-tighter uppercase">
                            YOUR PATH TO <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary">VITALITY</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
                            Expert-curated health advice and daily wellness tips to help you live your best, most vibrant life.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32"
                >
                    {healthTips.map((tip) => {
                        const Icon = tip.icon;
                        return (
                            <motion.div
                                key={tip.id}
                                variants={itemVariants}
                                whileHover={{ y: -15, rotate: 1 }}
                                className="group"
                            >
                                <Card className="h-full bg-card/40 border-white/5 backdrop-blur-2xl hover:bg-card/60 hover:border-emerald-500/30 transition-all duration-500 rounded-[3rem] overflow-hidden">
                                    <CardHeader className="p-10 pb-0">
                                        <motion.div
                                            whileHover={{ rotate: 15, scale: 1.1 }}
                                            className={`size-20 rounded-[2rem] ${tip.bg} flex items-center justify-center mb-10 shadow-inner group-hover:shadow-emerald-500/20 transition-all duration-500`}
                                        >
                                            <Icon className={`size-10 ${tip.color}`} />
                                        </motion.div>
                                        <div className="space-y-3">
                                            <span className="text-xs font-black text-primary tracking-[0.3em] uppercase block">
                                                {tip.category}
                                            </span>
                                            <h3 className="text-3xl font-black text-white leading-none tracking-tight">
                                                {tip.title}
                                            </h3>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-10">
                                        <p className="text-muted-foreground leading-relaxed text-lg mb-8 font-medium">
                                            {tip.description}
                                        </p>
                                        <motion.div whileHover={{ x: 10 }}>
                                            <Button variant="ghost" className="p-0 h-auto text-emerald-400 hover:text-white font-black tracking-widest uppercase flex items-center gap-3 decoration-2 underline-offset-8 hover:underline italic transition-all">
                                                KEEP READING
                                                <ChevronRight className="size-5" />
                                            </Button>
                                        </motion.div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Interactive Newsletter */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative group p-1 rounded-[4rem] bg-gradient-to-br from-white/10 to-transparent"
                >
                    <div className="bg-card/80 backdrop-blur-3xl rounded-[3.9rem] p-16 md:p-24 text-center overflow-hidden">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-40 -left-40 size-80 border border-emerald-500/10 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute -bottom-40 -right-40 size-96 border border-primary/10 rounded-full"
                        />

                        <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                            STAY SHARP, <br /><span className="text-emerald-400 italic">STAY HEALTHY</span>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
                            Join over 50,000+ people receiving our weekly medical briefings and wellness inspiration.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 w-full max-w-2xl mx-auto relative z-10">
                            <input
                                type="email"
                                placeholder="name@email.com"
                                className="h-20 px-10 rounded-[2rem] bg-white/5 border-2 border-white/5 text-white text-lg font-bold focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all flex-[2]"
                            />
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                                <Button className="w-full h-20 rounded-[2rem] bg-emerald-500 hover:bg-primary text-white font-black text-xl shadow-2xl shadow-emerald-500/20 transition-all">
                                    JOIN LIST
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
