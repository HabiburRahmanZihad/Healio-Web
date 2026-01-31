"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Rocket, Heart, Lock, Sparkles, History, Target, Users, ShieldCheck, Zap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const values = [
    { title: "Patient Centricity", desc: "Every decision we make starts with the patient's well-being and ease of access.", icon: Heart, color: "text-pink-500" },
    { title: "Verifiable Integrity", desc: "We ensure 100% authenticity through direct partnerships with certified manufacturers.", icon: ShieldCheck, color: "text-emerald-500" },
    { title: "Radical Transparency", desc: "No hidden costs. Clear origins. Full visibility of the pharmaceutical supply chain.", icon: Lock, color: "text-blue-500" },
    { title: "Scalable Innovation", desc: "Using AI and cloud tech to solve complex healthcare logistics at a national scale.", icon: Zap, color: "text-yellow-500" }
];

const ecosystem = [
    { name: "Verified Pharmacies", icon: ShieldCheck, desc: "Direct integration with licensed registries." },
    { name: "Expert Logistics", icon: Rocket, desc: "Cold-chain optimized delivery networks." },
    { name: "Patient Portal", icon: Users, desc: "Empowering users with data and advice." }
];

const stats = [
    { label: "Medicines Verified", value: "500k+", icon: ShieldCheck },
    { label: "Active Patients", value: "1.2M", icon: Users },
    { label: "Pharmacy Partners", value: "850+", icon: Target },
    { label: "Districts Served", value: "64", icon: MapPin }
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
            {/* Hero Section */}
            <section className="relative py-20 px-4 border-b border-white/5 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-0 right-0 size-150 bg-primary rounded-full blur-[100px] -z-10 translate-y-[-20%] translate-x-[20%]"
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
                            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-bold mb-6 uppercase tracking-widest"
                        >
                            <Sparkles className="size-3" />
                            <span>Innovation in Healthcare</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase leading-tight">
                            REVOLUTIONIZING <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-emerald-400 to-blue-500 animate-gradient-x text-5xl md:text-7xl">DIGITAL HEALTH</span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium"
                        >
                            Healio is a state-of-the-art pharmacy management platform designed to provide seamless access to medication and wellness advice for everyone.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* The Journey Section */}
            <section className="py-20 px-4 bg-white/1">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex-1 space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em]">
                                <History className="size-3" />
                                <span>The Genesis</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                                FROM VISION TO <span className="text-primary">VITALITY</span>
                            </h2>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                Healio started with a simple observation: healthcare was fragmented. Patients struggled with reliability, and pharmacies faced logistical nightmares. We set out to build a digital vessel that could navigate these complexities.
                            </p>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                Founded in 2026, our journey began with a small group of technologists and pharmacists who believed that <span className="text-white">access to medicine should be as simple as a click</span>, without compromising on verification or safety.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex-1 relative aspect-square group"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10 opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 p-2 bg-white/5">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="https://res.cloudinary.com/dzokxtodh/image/upload/v1769785502/ChatGPT_Image_Jan_30_2026_09_04_48_PM_bpc3fi.png"
                                        alt="Modern Healthcare Technology"
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="size-1.5 bg-primary rounded-full" />
                                            <span className="text-[8px] font-black tracking-widest uppercase">Est. 2026</span>
                                        </div>
                                        <p className="text-xs font-bold text-white uppercase tracking-tight">The intersection of care and code</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-20 px-4 relative">
                <div className="absolute inset-0 bg-primary/5 blur-[120px] -z-10 rounded-full translate-y-1/2" />
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-black uppercase tracking-tighter">OUR CORE <span className="text-primary">VALUES</span></h2>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">The principles that guide every shipment</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-white/3 border border-white/5 hover:border-primary/30 transition-all group"
                            >
                                <v.icon className={cn("size-8 mb-4 transition-transform group-hover:scale-110", v.color)} />
                                <h3 className="text-sm font-black uppercase mb-2 text-white">{v.title}</h3>
                                <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 px-4 border-y border-white/5">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center space-y-2"
                            >
                                <div className="size-10 mx-auto bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                                    <s.icon className="size-5" />
                                </div>
                                <h4 className="text-3xl font-black text-white">{s.value}</h4>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Mission (Refined) */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-black uppercase tracking-tight">THE HEALIO <span className="text-primary">Ecosystem</span></h2>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                Healio isn't just a store; it's a integrated healthcare network. Our platform connects multiple stakeholders to ensure that quality is never compromised.
                            </p>
                            <div className="space-y-4">
                                {ecosystem.map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-white/2 border border-white/5 hover:bg-white/4 transition-all">
                                        <div className="mt-1 size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            <item.icon className="size-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs uppercase text-white">{item.name}</h4>
                                            <p className="text-[10px] text-gray-500 font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group p-2 bg-white/5 shadow-2xl"
                        >
                            <div className="relative w-full h-full rounded-2xl overflow-hidden transition-all duration-700 group-hover:scale-[1.02]">
                                <Image
                                    src="https://res.cloudinary.com/dzokxtodh/image/upload/v1769785791/ChatGPT_Image_Jan_30_2026_09_09_32_PM_cezjqq.png"
                                    alt="Integrative Healthcare Network"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-30" />
                                <div className="absolute inset-0 bg-linear-to-tr from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-[9px] font-black tracking-widest uppercase">Live Network Verified</span>
                                    </div>
                                </div>
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
                        <Heart className="size-10 text-primary mx-auto mb-6 animate-pulse fill-primary" />
                        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-none uppercase">JOIN OUR MISSION</h2>
                        <p className="text-base md:text-lg text-white/50 mb-10 font-medium italic tracking-wide leading-relaxed">
                            "Healthcare is a human right, and technology is the <span className="text-primary font-bold">vessel</span> that delivers it to every doorstep."
                        </p>
                        <Link href="/medicines">
                            <Button size="lg" className="h-12 px-8 rounded-full bg-primary hover:bg-emerald-500 text-white font-black text-xs tracking-widest uppercase transition-all shadow-lg hover:shadow-primary/20">
                                Explore Medicines
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

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
        </div >
    );
}