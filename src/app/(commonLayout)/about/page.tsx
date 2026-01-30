"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { Github, Linkedin, Globe, Code2, Rocket, Heart, Database, Layout, Lock, Cpu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const techStack = [
    { name: "Next.js 16", icon: Rocket, desc: "Modern App Router & SSR" },
    { name: "TypeScript", icon: Code2, desc: "Type-safe development" },
    { name: "Tailwind 4", icon: Layout, desc: "Next-gen CSS utility framework" },
    { name: "Better Auth", icon: Lock, desc: "Secure authentication & session" },
    { name: "Framer Motion", icon: Cpu, desc: "Smooth, premium animations" },
    { name: "MongoDB", icon: Database, desc: "Scalable data management" }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
    }
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-white overflow-hidden font-sans">
            <AnimatePresence>
                {/* Hero Section */}
                <section key="hero-section" className="relative py-20 px-4 border-b border-white/5 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute top-0 right-0 size-[600px] bg-primary rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"
                    />

                    <div className="container mx-auto max-w-5xl relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold mb-6"
                            >
                                <Sparkles className="size-3.5" />
                                <span>Innovation in Healthcare</span>
                            </motion.div>

                            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase leading-tight">
                                REVOLUTIONIZING <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-blue-500 animate-gradient-x text-5xl md:text-7xl">DIGITAL HEALTH</span>
                            </h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                            >
                                Healio is a state-of-the-art pharmacy management platform designed to provide seamless access to medication and wellness advice for everyone.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* Our Mission */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-black uppercase tracking-tight">Our <span className="text-primary">Mission</span></h2>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    Our mission is to empower individuals to take control of their health by providing a transparent, efficient, and accessible pharmaceutical ecosystem. We bridge the gap between patients and essential healthcare resources through cutting-edge technology.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { title: "Accessibility", desc: "Medicines at your doorstep, everywhere." },
                                        { title: "Reliability", desc: "Verified pharmacies and authentic products." },
                                        { title: "Innovation", desc: "Redefining the pharmacy experience digitally." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <div className="mt-1 size-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                <Heart className="size-3 fill-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase text-white">{item.title}</h4>
                                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
                                    <Sparkles className="size-20 text-primary/20 opacity-50" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Impact CTA */}
                <section className="py-20 px-4 relative overflow-hidden text-center border-t border-white/5">
                    <div className="container mx-auto max-w-3xl relative z-10">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                        >
                            <Heart className="size-12 text-primary mx-auto mb-8 animate-pulse fill-primary" />
                            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-none uppercase">JOIN OUR MISSION</h2>
                            <p className="text-lg md:text-xl text-white/70 mb-10 font-medium italic tracking-wide leading-relaxed">
                                "Healthcare is a human right, and technology is the <span className="text-emerald-400 font-bold">vessel</span> that delivers it to every doorstep."
                            </p>
                            <Button size="lg" className="h-14 px-10 rounded-full bg-primary hover:bg-emerald-500 text-white font-black text-base tracking-widest uppercase transition-all shadow-lg hover:shadow-primary/20">
                                Explore Medicines
                            </Button>
                        </motion.div>
                    </div>
                </section>
            </AnimatePresence>

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