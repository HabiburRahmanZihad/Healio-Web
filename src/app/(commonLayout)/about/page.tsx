"use client";

import { motion, AnimatePresence } from "framer-motion";
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

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
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
                <section className="relative py-32 px-4 border-b border-white/5 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.15, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute top-0 right-0 size-[800px] bg-primary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"
                    />

                    <div className="container mx-auto max-w-6xl relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-bold mb-8"
                            >
                                <Sparkles className="size-4" />
                                <span>Innovation in Healthcare</span>
                            </motion.div>

                            <h1 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter leading-[0.9] uppercase">
                                BUILDING THE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-blue-500 animate-gradient-x">FUTURE</span>
                            </h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 1 }}
                                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                            >
                                Healio is a state-of-the-art pharmacy management platform designed to provide seamless access to medication and wellness advice for everyone.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* Developer Spotlight */}
                <section className="py-32 px-4 relative">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -100, rotate: -5 }}
                                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                                transition={{ type: "spring", damping: 15 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        rotate: [0, 5, 0]
                                    }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -inset-8 bg-gradient-to-tr from-primary/30 to-emerald-500/30 blur-[60px] opacity-50 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="relative aspect-[4/5] rounded-[3rem] bg-card border border-white/10 overflow-hidden shadow-2xl">
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        src="https://res.cloudinary.com/dvq3pcykn/image/upload/v1758785330/IMG-20241101-WA0192_vyojiv.jpg"
                                        className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                        alt="Habibur Rahman Zihad"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                    <div className="absolute bottom-12 left-12 right-12">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <h3 className="text-5xl font-black">Habibur Rahman <span className="text-primary italic">Zihad</span></h3>
                                            <p className="text-xl text-emerald-400 font-mono tracking-[0.2em] mt-3 uppercase font-bold">Full-Stack Engineer</p>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ type: "spring", damping: 20 }}
                                viewport={{ once: true }}
                                className="flex flex-col gap-10"
                            >
                                <div className="space-y-6">
                                    <motion.span
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "fit-content" }}
                                        className="block overflow-hidden whitespace-nowrap text-primary font-black tracking-[0.4em] uppercase text-sm border-b-2 border-primary pb-2"
                                    >
                                        The visionary behind Healio
                                    </motion.span>
                                    <h2 className="text-5xl md:text-6xl font-black leading-none">
                                        CRAFTING <span className="text-emerald-400">IMPACTFUL</span> <br />EXPERIENCES.
                                    </h2>
                                    <p className="text-xl text-muted-foreground leading-relaxed">
                                        With a focus on modern web technologies and user-centric design, I build applications that are not just functional, but delightful to use. Healio represents my commitment to using technology for social good and local healthcare empowerment.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-5">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button asChild size="lg" className="h-16 rounded-2xl gap-3 font-black bg-white text-black hover:bg-emerald-500 hover:text-white transition-all px-8 border-none shadow-xl shadow-white/5">
                                            <a href="https://habibur-rahman-zihad.vercel.app/" target="_blank" rel="noopener noreferrer">
                                                PORTFOLIO <Globe className="size-5" />
                                            </a>
                                        </Button>
                                    </motion.div>
                                    <div className="flex gap-4">
                                        {[
                                            { icon: Github, href: "https://github.com/HabiburRahmanZihad" },
                                            { icon: Linkedin, href: "https://linkedin.com/in/habiburrahmanzihad" }
                                        ].map((social, i) => (
                                            <motion.div key={i} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                <Button asChild size="icon" variant="outline" className="size-16 rounded-2xl border-white/10 bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors">
                                                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                                                        <social.icon className="size-6" />
                                                    </a>
                                                </Button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Tech Stack Reveal */}
                <section className="py-32 px-4 bg-emerald-500/[0.02]">
                    <div className="container mx-auto max-w-6xl">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                            className="text-center mb-24"
                        >
                            <motion.h2 variants={itemVariants} className="text-4xl md:text-7xl font-black mb-6 tracking-tight">THE TECHNICAL <span className="text-primary italic">BACKBONE</span></h2 >
                            <motion.p variants={itemVariants} className="text-xl text-muted-foreground">Premium technologies powered by modern development standards.</p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {techStack.map((tech) => {
                                const Icon = tech.icon;
                                return (
                                    <motion.div
                                        key={tech.name}
                                        variants={itemVariants}
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        className="relative p-10 rounded-[2.5rem] bg-card/40 border border-white/5 hover:border-emerald-500/50 transition-all group backdrop-blur-sm overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="size-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all duration-500">
                                            <Icon className="size-8 text-primary group-hover:scale-110 transition-transform" />
                                        </div>
                                        <h3 className="text-2xl font-black mb-3">{tech.name}</h3>
                                        <p className="text-muted-foreground leading-relaxed text-lg">{tech.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* Vision CTA */}
                <section className="py-40 px-4 relative overflow-hidden text-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-primary rounded-full blur-[160px]"
                    />

                    <div className="container mx-auto max-w-4xl relative z-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Heart className="size-20 text-primary mx-auto mb-12 animate-pulse fill-primary" />
                            <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tight leading-none">JOIN OUR <br />MISSION</h2>
                            <p className="text-2xl md:text-3xl text-white/70 mb-16 font-medium italic tracking-wide leading-relaxed">
                                "Healthcare is a human right, and technology is the <span className="text-emerald-400">vessel</span> that delivers it to every doorstep."
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: -1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Button size="lg" className="h-20 px-16 rounded-full bg-primary hover:bg-emerald-500 text-white font-black text-xl tracking-widest shadow-2xl shadow-primary/40 uppercase transition-all">
                                    Support Healio
                                </Button>
                            </motion.div>
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