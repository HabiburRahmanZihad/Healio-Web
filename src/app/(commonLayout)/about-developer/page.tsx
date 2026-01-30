"use client";

import { motion, Variants } from "framer-motion";
import { Github, Linkedin, Globe, Code2, Rocket, Database, Layout, Lock, Cpu, Sparkles } from "lucide-react";
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

export default function AboutDeveloperPage() {
    return (
        <div className="min-h-screen bg-background text-white overflow-hidden font-sans pb-20">
            {/* Hero Section */}
            <section className="relative py-20 px-4 border-b border-white/5 overflow-hidden">
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
                            <span>The Minds Behind Healio</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">
                            Developer & <span className="text-primary">Technology</span>
                        </h1>

                        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Crafting high-performance digital solutions with modern stacks and user-centric design principles.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Developer Section */}
            <section className="py-20 px-4 relative">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/5] rounded-[2.5rem] bg-card border border-white/10 overflow-hidden shadow-xl max-w-sm mx-auto lg:mx-0">
                                <img
                                    src="https://res.cloudinary.com/dvq3pcykn/image/upload/v1758785330/IMG-20241101-WA0192_vyojiv.jpg"
                                    className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    alt="Habibur Rahman Zihad"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 text-center lg:text-left">
                                    <h3 className="text-3xl font-black italic">Habibur Rahman <span className="text-primary">Zihad</span></h3>
                                    <p className="text-sm text-emerald-400 font-mono tracking-widest mt-1 uppercase font-bold">Full-Stack Engineer</p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-black leading-tight">
                                CRAFTING <span className="text-emerald-400 text-2xl md:text-3xl block lg:inline">IMPACTFUL</span> EXPERIENCES.
                            </h2>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                With a focus on modern web technologies and user-centric design, I build applications that are not just functional, but delightful to use. Healio represents my commitment to using technology for social good and local healthcare empowerment.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button asChild size="sm" className="h-12 rounded-xl gap-2 font-bold bg-white text-black hover:bg-primary hover:text-white transition-all px-6">
                                    <a href="https://habibur-rahman-zihad.vercel.app/" target="_blank" rel="noopener noreferrer">
                                        PORTFOLIO <Globe className="size-4" />
                                    </a>
                                </Button>
                                <div className="flex gap-2">
                                    {[
                                        { icon: Github, href: "https://github.com/HabiburRahmanZihad" },
                                        { icon: Linkedin, href: "https://linkedin.com/in/habiburrahmanzihad" }
                                    ].map((social, i) => (
                                        <Button key={i} asChild size="icon" variant="outline" className="size-12 rounded-xl border-white/10 bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors">
                                            <a href={social.href} target="_blank" rel="noopener noreferrer">
                                                <social.icon className="size-5" />
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-20 px-4 bg-primary/[0.02]">
                <div className="container mx-auto max-w-5xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={containerVariants}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-black mb-4 tracking-tight">THE TECHNICAL <span className="text-primary italic">CORE</span></motion.h2>
                        <motion.p variants={itemVariants} className="text-base text-muted-foreground">Premium technologies powering the scale and performance of Healio.</motion.p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {techStack.map((tech) => {
                            const Icon = tech.icon;
                            return (
                                <motion.div
                                    key={tech.name}
                                    variants={itemVariants}
                                    className="p-8 rounded-[1.5rem] bg-card/40 border border-white/5 hover:border-primary/50 transition-all group backdrop-blur-sm"
                                >
                                    <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                                        <Icon className="size-6 text-primary group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="text-xl font-black mb-2">{tech.name}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{tech.desc}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
