"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Apple, Pill, BookOpen, ChevronRight, Activity } from "lucide-react";
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

export default function HealthTipsPage() {
    return (
        <div className="min-h-screen bg-background py-24 px-4 overflow-hidden">
            <div className="container mx-auto relative">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 size-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 size-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-widest uppercase mb-4">
                            Wellness Journey
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                            Your Path to a <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Healthier Life</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Expert-curated health advice and daily wellness tips to help you live your best, most vibrant life.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {healthTips.map((tip, index) => {
                        const Icon = tip.icon;
                        return (
                            <motion.div
                                key={tip.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -8 }}
                            >
                                <Card className="h-full bg-card/40 border-white/5 backdrop-blur-md hover:bg-card/60 hover:border-white/10 transition-all duration-300 group">
                                    <CardHeader className="p-8 pb-0">
                                        <div className={`size-14 rounded-2xl ${tip.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <Icon className={`size-7 ${tip.color}`} />
                                        </div>
                                        <span className="text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
                                            {tip.category}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white leading-tight">
                                            {tip.title}
                                        </h3>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <p className="text-muted-foreground leading-relaxed mb-6">
                                            {tip.description}
                                        </p>
                                        <Button variant="ghost" className="p-0 h-auto text-white/50 hover:text-primary transition-colors group/btn">
                                            Read More
                                            <ChevronRight className="size-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Newsletter / CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-28 p-12 rounded-[2rem] bg-gradient-to-br from-card/80 to-card/20 border border-white/5 backdrop-blur-xl flex flex-col items-center text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Stay Updated with Health Insights
                    </h2>
                    <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
                        Subscribe to our newsletter and receive the latest medical advice and wellness trends directly in your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="h-14 px-6 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-colors flex-1"
                        />
                        <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20">
                            Subscribe
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
