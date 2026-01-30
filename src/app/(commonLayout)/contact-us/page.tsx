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
        <div className="min-h-screen bg-background py-24 px-4 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 size-[800px] bg-primary/10 rounded-full blur-[160px] -translate-y-1/2 -translate-x-1/2 -z-10" />
            <div className="absolute bottom-0 right-0 size-[600px] bg-emerald-500/5 rounded-full blur-[140px] translate-y-1/2 translate-x-1/2 -z-10" />

            <div className="container mx-auto max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
                            <MessageSquare className="size-3.5" />
                            <span>Get in Touch</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter uppercase">
                            WE'RE HERE TO <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary italic">HELP YOU.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
                            Have questions about our wellness plans, medicines, or services? Our team of experts is ready to support your health journey.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Info Sidebar */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-12"
                    >
                        <div className="grid grid-cols-1 gap-6">
                            {contactInfo.map((info) => {
                                const Icon = info.icon;
                                return (
                                    <motion.div
                                        key={info.title}
                                        variants={itemVariants}
                                        whileHover={{ x: 10 }}
                                        className="flex gap-6 p-8 rounded-[2.5rem] bg-card/30 border border-white/5 backdrop-blur-xl group hover:border-emerald-500/30 transition-all duration-500"
                                    >
                                        <div className={`size-16 rounded-2xl ${info.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-inner`}>
                                            <Icon className={`size-8 ${info.color}`} />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-black text-white uppercase tracking-tight">{info.title}</h3>
                                            <p className="text-xl font-bold text-white tracking-tight">{info.value}</p>
                                            <p className="text-sm text-muted-foreground font-medium">{info.desc}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Social & Hours */}
                        <motion.div variants={itemVariants} className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/10 to-transparent border border-white/5 backdrop-blur-sm shadow-2xl">
                            <h4 className="text-sm font-black text-primary tracking-[0.3em] uppercase mb-8">Follow Our Impact</h4>
                            <div className="flex gap-4">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Social, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="size-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary/20 hover:text-primary transition-all shadow-lg"
                                    >
                                        <Social className="size-6" />
                                    </motion.button>
                                ))}
                            </div>
                            <div className="mt-10 flex items-center gap-4 text-muted-foreground font-medium">
                                <Clock className="size-5 text-emerald-400" />
                                <span>Support is available 24/7 for emergency health queries.</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, type: "spring", damping: 20 }}
                        className="relative p-1 rounded-[3.5rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 shadow-2xl"
                    >
                        <div className="bg-card/90 backdrop-blur-3xl rounded-[3.4rem] p-10 md:p-16 space-y-10">
                            <div className="space-y-4 text-center lg:text-left">
                                <h2 className="text-4xl font-black text-white leading-none tracking-tight">SEND A MESSAGE</h2>
                                <p className="text-muted-foreground font-medium italic">We typically respond in less than 2 hours.</p>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 tracking-widest uppercase ml-2">Full Name</label>
                                        <Input
                                            placeholder="Enter your name"
                                            className="h-16 px-6 rounded-2xl bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all font-medium text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 tracking-widest uppercase ml-2">Email Address</label>
                                        <Input
                                            type="email"
                                            placeholder="name@email.com"
                                            className="h-16 px-6 rounded-2xl bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all font-medium text-white"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 tracking-widest uppercase ml-2">Subject</label>
                                    <Input
                                        placeholder="What can we help you with?"
                                        className="h-16 px-6 rounded-2xl bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all font-medium text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 tracking-widest uppercase ml-2">Your Message</label>
                                    <Textarea
                                        placeholder="Tell us more about your inquiry..."
                                        className="min-h-[200px] p-6 rounded-3xl bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all font-medium text-white resize-none"
                                    />
                                </div>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button className="w-full h-20 rounded-[2rem] bg-primary hover:bg-emerald-500 text-white font-black text-xl shadow-2xl shadow-primary/40 transition-all uppercase tracking-widest flex gap-3">
                                        <Send className="size-6" />
                                        Launch Inquiry
                                    </Button>
                                </motion.div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}