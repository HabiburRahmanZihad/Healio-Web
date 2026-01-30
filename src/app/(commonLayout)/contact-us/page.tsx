"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Facebook, Twitter, Instagram, Linkedin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
    {
        icon: Mail,
        title: "Email Us",
        value: "support@healio.com",
        desc: "We usually respond within 24 hours.",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        icon: Phone,
        title: "Call Us",
        value: "+880 1234 567 890",
        desc: "Available Mon-Fri, 9am - 6pm.",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
    },
    {
        icon: MapPin,
        title: "Visit Us",
        value: "Healio Tower, Wellness Blvd, Dhaka",
        desc: "Our headquarters and research center.",
        color: "text-primary",
        bg: "bg-primary/10",
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
};

const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
    }
};

export default function ContactUs() {
    return (
        <div className="min-h-screen bg-background py-16 px-4 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 size-[600px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 -z-10" />
            <div className="absolute bottom-0 right-0 size-[400px] bg-emerald-500/5 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2 -z-10" />

            <div className="container mx-auto max-w-6xl">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4 shadow-sm">
                            <MessageSquare className="size-3" />
                            <span>Get in Touch</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
                            WE'RE HERE TO <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary italic">HELP YOU.</span>
                        </h1>
                        <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto font-medium">
                            Have questions about our wellness plans, medicines, or services? Our team of experts is ready to support your health journey.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info Sidebar */}
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 gap-4">
                            {contactInfo.map((info) => {
                                const Icon = info.icon;
                                return (
                                    <motion.div
                                        key={info.title}
                                        whileHover={{ x: 5 }}
                                        className="flex gap-5 p-6 rounded-[2rem] bg-card/30 border border-white/5 backdrop-blur-xl group hover:border-emerald-500/30 transition-all duration-500"
                                    >
                                        <div className={`size-12 rounded-xl ${info.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-500 border border-white/5`}>
                                            <Icon className={`size-6 ${info.color}`} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <h3 className="text-xs font-black text-white uppercase tracking-wider">{info.title}</h3>
                                            <p className="text-lg font-bold text-white tracking-tight">{info.value}</p>
                                            <p className="text-[10px] text-muted-foreground font-medium uppercase">{info.desc}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Social & Hours */}
                        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border border-white/5 backdrop-blur-sm">
                            <h4 className="text-[10px] font-black text-primary tracking-[0.2em] uppercase mb-6">Follow Our Impact</h4>
                            <div className="flex gap-3">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Social, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ y: -3, scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="size-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary/20 hover:text-primary transition-all"
                                    >
                                        <Social className="size-5" />
                                    </motion.button>
                                ))}
                            </div>
                            <div className="mt-8 flex items-center gap-3 text-muted-foreground font-medium">
                                <Clock className="size-4 text-emerald-400" />
                                <span className="text-[10px] uppercase tracking-wider">Support is available 24/7 for emergency health queries.</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative p-1 rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-white/5"
                    >
                        <div className="bg-card/90 backdrop-blur-3xl rounded-[1.9rem] p-8 md:p-12 space-y-8">
                            <div className="space-y-2 text-center lg:text-left">
                                <h2 className="text-2xl font-black text-white leading-none tracking-tight uppercase">SEND A MESSAGE</h2>
                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Typically respond in less than 2 hours.</p>
                            </div>

                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase ml-2">Full Name</label>
                                        <Input
                                            placeholder="Full name"
                                            className="h-12 px-4 rounded-xl bg-white/5 border-white/10 focus:border-emerald-500/50 transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase ml-2">Email</label>
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            className="h-12 px-4 rounded-xl bg-white/5 border-white/10 focus:border-emerald-500/50 transition-all text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase ml-2">Subject</label>
                                    <Input
                                        placeholder="What can we help you with?"
                                        className="h-12 px-4 rounded-xl bg-white/5 border-white/10 focus:border-emerald-500/50 transition-all text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase ml-2">Your Message</label>
                                    <Textarea
                                        placeholder="Message details..."
                                        className="min-h-[160px] p-4 rounded-xl bg-white/5 border-white/10 focus:border-emerald-500/50 transition-all text-sm resize-none"
                                    />
                                </div>
                                <Button className="w-full h-14 rounded-xl bg-primary hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-primary/20 transition-all uppercase tracking-widest flex gap-2">
                                    <Send className="size-4" />
                                    Launch Inquiry
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
